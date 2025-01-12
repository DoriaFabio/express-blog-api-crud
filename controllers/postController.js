import { posts } from "../data/post.js";
import CustomError from "../class/customError.js";  

// const { post } = require("../routers/posts.js");

function index(req, res) {
  const itemTitle = req.query.titolo;
  const itemTags = req.query.tags;
  // const response = {
  //   totalCount: blog.length,
  //   data: [...blog],
  //   // copia dell'array nel caso dovessimo filtrare i dati
  // };

  let blogCopy = [...posts];
  if (itemTitle) {
    blogCopy = posts.filter((item) =>
      item.titolo.toLowerCase().includes(itemTitle.toLowerCase())
    );
  }
  if (itemTags) {
    blogCopy = blogCopy.filter((item) =>
      item.tags.includes(itemTags)
    );
  }
  const response = {
    totalCount: posts.length,
    data: blogCopy,
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const item = posts.find((item) => item.id === id);
  if (item) {
    res.json({
      success: true,
      item,
    });
  } else {
    res.status(404);
    res.json({
      success: false,
      message: "Il post non esiste",
    });
  }
}

function store(req, res) {
  // res.send("Creazione nuovo post");
  let newid = 0;
  for(let i = 0; i < posts.length; i++) {
    if(posts[i].id > newid) {
      newid = posts[i].id
    }
  }
  newid += 1;

  const newPost = {
    id: newid,
    ...req.body,
    // titolo: req.body.titolo,
    // contenuto: req.body.contenuto,
    // immagine: req.body.immagine,
    // tags: req.body.tags
  };

  posts.push(newPost);
  res.status(201).json(newPost);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const item = posts.find((item) => item.id === id);
  if (item) {
    res.send(`Modifica integrale del post ${id}`);
    for(key in item) {
      if(key !== "id") {
        item[key] = req.body[key];
      }
    }
    res.json(item);
  } else {
    res.status(404);
    res.json({
      success: false,
      message: `Il post ${id} non esiste`,
    });
  }
}

function modify(req, res) {
  const id = parseInt(req.params.id);
  const item = posts.find((item) => item.id === id);
  if (item) {
    res.send(`Modifica parziale del post ${id}`);
  } else {
    res.status(404);
    res.json({
      success: false,
      message: `Il post ${id} non esiste`,
    });
  }
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((item) => item.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({
      error: "404",
      message: "Post non trovato",
    });
  }
}

export { index, show, store, update, modify, destroy };