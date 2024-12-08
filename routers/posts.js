const express = require("express");
const router = express.Router();
const checkTime = require("../middlewares/checkTime");

const controller = require('../controllers/postController');

// const {
//     index,
//     show,
//     store,
//     update,
//     modify,
//     destroy,
// } = require("../controllers/postController");

// index
router.get("/", controller.index);

// leggere un solo post - Read one - Show
router.get("/:id", controller.show);

//Create - Store
router.post("/", controller.store);

//Update totale - Update
router.put("/:id", controller.update);

//Update parziale - Modify
router.patch("/:id", controller.modify);

//Delete (cancellazione) - Destroy
router.delete("/:id", controller.destroy);

module.exports = router;