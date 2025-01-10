import express from "express"
const router = express.Router();
// const checkTime = require("../middlewares/checkTime");

import {
    index,
    show,
    store,
    update,
    modify,
    destroy,
} from "../controllers/postController.js";

// const {
//     index,
//     show,
//     store,
//     update,
//     modify,
//     destroy,
// } = require("../controllers/postController");

// index
router.get("/", index);

// leggere un solo post - Read one - Show
router.get("/:id", show);

//Create - Store
router.post("/", store);

//Update totale - Update
router.put("/:id", update);

//Update parziale - Modify
router.patch("/:id", modify);

//Delete (cancellazione) - Destroy
router.delete("/:id", destroy);

export default router;