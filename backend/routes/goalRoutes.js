const express =  require('express')

const {protect} = require('../middleware/authMIddleware')

const router = express.Router()
const { getGoals, createGoals, updateGoals, deleteGoals } = require('../controllers/goalControllers')

//post request (create)
router.post('/', protect, createGoals)

//get request (read)
router.get('/',protect, getGoals) 


//put request (update)
router.put('/:id',protect,  updateGoals)



//delete request (delete)
router.delete('/:id', protect,  deleteGoals)

module.exports  = router