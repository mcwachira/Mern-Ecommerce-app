import mongoose from 'mongoose'
import colors from 'colors'

const connectDb = async () => {
    console.log(process.env.MONGO_URI)
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            name: 'MernEcomm',
        })

        console.log(`MongoDb  connected ${connect.connection.host}`.blue.underline)
    } catch (error) {
        console.log(`error :${error.messages}`.red.underline.bold)
        process.exit(1)
    }


}


export default  connectDb;
