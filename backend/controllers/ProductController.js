import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js'

//@desc Fetch All Products
//@route Get /api/products
//@access Public
const getProducts =  asyncHandler(async(req, res) => {

    const products = await Product.find({})

    res.json(products)
});

//@desc Fetch A Product
//@route Get /api/products/:id
//@access Public
const getProductById =  asyncHandler(async(req, res) => {
    const product =await  Product.findById(req.params.id )


    if(product){
        return  res.json(product)
    }else{
        res.status(404);
        throw new Error('Resource not found ')
    }
});

//@desc Fetch A Product
//@route Post /api/product
//@access Private/Admin
const createProduct =  asyncHandler(async(req, res) => {
    const product = new Product({
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample Brand',
        category:'Simple Category',
        countInStock:0,
        numReviews:0,
        description:'Sample description'
    })



    const createdProduct = await product.save()

 res.status(201).json(createdProduct)

});

const updateProduct =  asyncHandler(async(req, res) => {
    const{  name,
        price,
       description,
        image,
        brand,
        category,
        countInStock,
        numReviews,

    } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name=name;
        product.price=price;
            product.image=image;
            product.brand=brand;
            product.category=category;
            product.countInStock=countInStock;

        const updatedProduct = await product.save()

        res.status(201).json(updatedProduct)

    }else{
        res.status(404);
        throw new Error('Product not found ')
    }





});


//@desc Delete User
//@route Delete /api/product/:id
//@access Private Admin
const deleteProduct =  asyncHandler(async(req, res) => {
    //const product =await  Product.findByIdAndDelete(req.params.id )
    const product =await  Product.findById(req.params.id )


    if(product){
        await Product.deleteOne();

        res.status(201).json('product deleted')

    }else{
        res.status(404);
        throw new Error('Product not found ')
    }

});


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

