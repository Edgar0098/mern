const express = require("express");
const router = express.Router();

const {
  getGoals,
  deleteGoal,
  updateGoal,
  setGoal,
} = require("../controllers/goalControllers");

const {protect} = require('../middleware/authMiddleware')

//router.route("/").get(getGoals).post(setGoals);
//router.route("/:id").put(updateGoals).delete(deleteGoals);

router.route('/').get(protect,getGoals).post(protect,setGoal)

//router.post('/',setGoal)

router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

//router.delete('/:id',deleteGoal)

router.get('/test', async (req, res) => {// controller function(request, response)
  // const goals = await Goal.find();
  res.status(200).json();

})


module.exports = router;
