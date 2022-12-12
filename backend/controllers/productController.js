const Product = require('../models/productModel')
const formidable = require('formidable')
const fs = require('fs')
const_ = require('lodash')
const asyncHandler = require('express-async-handler')
const { indexOf } = require('lodash')



const createProduct = asyncHandler(async (req, res) => {

    //check if the product exist
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        //check if product with similar name exist



        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }

        console.log('image', product)

        const newProduct = await product.save()
        console.log(newProduct)

        if (!newProduct) {
            res.status(400).json({ error: 'error creating product' })
        }


        res.status(200).json(newProduct)
    }





    )



})


const getProducts = asyncHandler(async (req, res) => {




})

// const getProductById = asyncHandler(async (req, res) => {
//     //get id from params
//     const id = req.params;

//     //check for existence of the product
//     const product = Product.findById(id).exec()

//     if (!product) {
//         res.status(400).json({ error: 'Product with that id does not exist' })
//     }

//     res.status(200).json(product)
// })
const getProductById = asyncHandler(async (req, res, next, id) => {
    // //get id from params
    // const id = req.params;

    //check for existence of the product
    const product = Product.findById(id).exec()

    if (!product) {
        res.status(400).json({ error: 'Product with that id does not exist' })
    }

    req.product = product;
    next()
})

const read = asyncHandler(async (req, res) => {
    const product = await req.product
    console.log(product)
    // req.product.photo = undefined
    return res.status(200).json(req.product)

})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;

    //check for existence of the product
    const product = Product.findById(id).exec()

})


const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;

    //check for existence of the product
    const product = await Product.findById(id).exec()

    if (!product) {
        res.status(400).json({ error: 'Product with that id does not exist' })
    }

    const deletedProduct = await Product.findByIdAndDelete(id).exec()

    if (!deleteProduct) {
        res.status(400).json({ error: 'Failed deleting product' })
    }

    res.status(200).json({ message: 'deleted product successfully' })

})



///check best selling products and the new products in

//products?sortBy=sold&order=desc&limit=4

///products?sortBy=createdAt&order=desc&limit=4

//check fro route parameters


const listProducts = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    const product = Product.find().select(-photo)
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit).exec()

    if (!product) {
        res.status(400).json({ error: 'Product with that id does not exist' })
    }

    res.status(200).json(product)

}

//find the product based on the category and find similar products in the same category use product id
const listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    const similarProduct = Product.find({ _id: { $ne: req.product }, category: req.product.category }).limit(limit).populate('category', '_id name').exec()

    if (!similarProduct) {
        res.status(400).json({ error: 'Product with that id does not exist' })
    }

    res.status(200).json(similarProduct)
}

const listCategories = (req, res) => {
    const category = Product.distinct('category')
    if (!category) {
        res.status(400).json({ error: 'Category not found' })
    }

    res.status(200).json(category)
}

const listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};



//get categories based on products
module.exports = {
    createProduct,
    read,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}