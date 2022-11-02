const express =  require('express')

const router = express.Router()
const { getGoals, createGoals, updateGoals, deleteGoals } = require('../controllers/goalControllers')

//post request (create)
router.post('/', createGoals)

//get request (read)
router.get('/',getGoals) 


//put request (update)
router.put('/:id', updateGoals)



//delete request (delete)
router.delete('/:id', deleteGoals)

module.exports  = router