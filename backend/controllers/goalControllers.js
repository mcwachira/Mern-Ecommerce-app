const asyncHandler = require('express-async-handler')

//@desc  get  goals
//@route GET  /api/goals
//@access Public

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'read goals' })
})

//@desc  create a   goal
//@route POST  /api/goals
//@access Private

const createGoals = asyncHandler(async(req, res) => {
    if(!req.body.text){
        throw new Error('please add text')
    }
})



//@desc  update a goal
//@route PUT  /api/goals/:id
//@access Private

const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update goals  ${req.params.id}` })
})



//@desc  delete  goals
//@route DELETE  /api/goals/:id
//@access Private

const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete goals  ${req.params.id}` })
})

module.exports = {
    getGoals, createGoals, updateGoals, deleteGoals
}