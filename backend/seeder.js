import dotenv from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import  connectDb from './config/db.js'

dotenv.config();


//mongodb database
connectDb()

//create data
const importData = async() => {
    try{

        //start with  cleaning the database
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()


        const createUsers = await User.insertMany(users)

        const adminUser = createUsers[0].id

        const sampleProducts = products.map((product) => {
            return {...product, user:adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('data imported !'.green.inverse)
        process.exit()

    }catch(error){

        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

//destroy data

const destroyData = async() => {
    try{

        //start with  cleaning the database
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()


        console.log('data destroyed !'.red.inverse)
        process.exit()

    }catch(error){

        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


if(process.argv[2] ==='-d'){
    destroyData()
}else  {
    importData()
}
