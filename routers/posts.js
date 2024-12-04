const express = require("express");
const router = express.Router();

const blog = require("../data/post.js");  // Tutti i posts

let id = "";
// index
router.get("/", (req, res) => {
    const itemName = req.query.titolo;
    const itemTags = req.query.tags;
    console.log(itemName);
    let response = {
        count: blog.length,
        data: [...blog],
        // copia dell'array nel caso dovessimo filtrare i dati
    };
    if (itemName) {
        response.data = blog.filter((item) =>
            item.titolo.toLowerCase().includes(itemName.toLowerCase())
        );
        if (itemTags) {
            response.data = blog.filter((item) =>
                item.tags.includes(itemTags.toLowerCase())
            );
        }
        // if (response.data.length < 1) {
        //   res.status(404);
        //   response = {
        //     error: 404,
        //     message: "Non ci sono post per la tua ricerca",
        //   };
        // }
    }
    res.json(response);
});

// leggere un solo post - Read one - Show
router.get("/:id", (req, res) => {
    //posts/1/
    id = parseInt(req.params.id);
    const item = blog.find((item) => item.id === id);
    if (item) {
        res.json({
            success: true,
            item,
        });
    } else {
        res.status(404);
        res.json({
            success: false,
            message: `Il post ${id} non esiste`,
        });
    }
});

//Create - Store
router.post("/", (req, res) => {
    res.send("Creazione nuovo post");
});

//Update totale - Update
router.put("/:id", (req, res) => {
    id = parseInt(req.params.id);
    const item = blog.find((item) => item.id === id);
    if (item) {
        res.send(`Modifica integrale del post ${id}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: `Il post ${id} non esiste`,
        });
    }
});

//Update parziale - Modify
router.patch("/:id", (req, res) => {
    id = parseInt(req.params.id);
    const item = blog.find((item) => item.id === id);
    if (item) {
        res.send(`Modifica parziale del post ${id}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: `Il post ${id} non esiste`,
        });
    }

});

//Delete (cancellazione) - Destroy
router.delete("/:id", (req, res) => {
    id = parseInt(req.params.id);
    const item = blog.find((item) => item.id === id);
    if (item) {
        res.send(`Cancellazione del post ${id}`);
    } else {
        res.status(404);
        res.json({
            success: false,
            message: `Il post ${id} non esiste`,
        });
    }
});

module.exports = router;