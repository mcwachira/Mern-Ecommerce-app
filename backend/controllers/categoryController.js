const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    const category = await Category.findOne({ name });

    //const category = new Category(req.body)

    if (category) {
        res.status(400).json({ error: 'error creating category as category already exist' })
    }

    const newCategory = await Category.create({
        name: name
    })
    res.status(200).json(newCategory)

})


module.exports = {
    createCategory
}