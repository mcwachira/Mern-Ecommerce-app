const asyncHandler = require('express-async-handler')
const Goals = require('../models/goalModel')

//@desc  get  goals
//@route GET  /api/goals
//@access Public

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goals.find()
    res.status(200).send(goals)
})

//@desc  create a   goal
//@route POST  /api/goals
//@access Private

const createGoals = asyncHandler(async(req, res) => {
    if(!req.body){
        throw new Error('please add text')
    }
    console.log(req.body)

    const {name, description} = req.body
    const newGoal = await new Goals({name, description}).save()
    res.status(200).json(newGoal)
})



//@desc  update a goal
//@route PUT  /api/goals/:id
//@access Private

const updateGoals = asyncHandler(async (req, res) => {
   const goal = await Goals.findById(req.params.id)
   if(!goal){
    res.status(400)
    throw new Error('Goal not found')
    
   }

   const updatedGoal =await Goals.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
   } )
    res.status(200).json(updatedGoal)
})



//@desc  delete  goals
//@route DELETE  /api/goals/:id
//@access Private

const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goals.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')

    }

   // const newGoals = await Goals.findByIdAndDelete(req.params.id)
   await goal,remove()
    res.status(200).json(newGoals)
})

module.exports = {
    getGoals, createGoals, updateGoals, deleteGoals
}