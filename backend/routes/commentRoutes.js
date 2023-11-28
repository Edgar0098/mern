const express = require("express");
const router = express.Router();

const {
  getComments,
  deleteComment,
  updateComment,
  setComment,
} = require("../controllers/commentControllers");
const {protect} = require('../middleware/authMiddleware')

//router.route("/").get(getComments).post(setComments);
//router.route("/:id").put(updateComments).delete(deleteComments);

router.route('/').get(protect,getComments).post(protect,setComment)

//router.post('/',setComment)

router.route('/:id').put(protect,updateComment).delete(protect,deleteComment)

//router.delete('/:id',deleteComment)

router.get('/test', async (req, res) => {// controller function(request, response)
  // const comments = await Comment.find();
  res.status(200).json();

})


module.exports = router;
