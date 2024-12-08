const blog = require("../data/post.js"); //i vostri posts
const CustomError = require("../class/customError");

// const { post } = require("../routers/posts.js");

function index(req, res) {
  const itemTitle = req.query.titolo;
  const itemTags = req.query.tags;
  // const response = {
  //   totalCount: blog.length,
  //   data: [...blog],
  //   // copia dell'array nel caso dovessimo filtrare i dati
  // };

  let blogCopy = [...blog];
  if (itemTitle) {
    blogCopy = blog.filter((item) =>
      item.titolo.toLowerCase().includes(itemTitle.toLowerCase())
    );
  }
  if (itemTags) {
    blogCopy = blogCopy.filter((item) =>
      item.tags.includes(itemTags)
    );
  }
  const response = {
    totalCount: blog.length,
    data: blogCopy,
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
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
      message: "Il post non esiste",
    });
  }
}

function store(req, res) {
  // res.send("Creazione nuovo post");
  let newid = 0;
  for(let i = 0; i < blog.length; i++) {
    if(blog[i].id > newid) {
      newid = blog[i].id
    }
  }
  newid += 1;

  const newPost = {
    id: newid,
    titolo: req.body.titolo,
    contenuto: req.body.contenuto,
    immagine: req.body.immagine,
    tags: req.body.tags
  }

  blog.push(newPost);
  res.status(201).json(newPost);
}

function update(req, res) {
  id = parseInt(req.params.id);
  const item = blog.find((item) => item.id === id);
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
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = blog.findIndex((item) => item.id === id);
  if (index !== -1) {
    blog.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({
      error: "404",
      message: "Post non trovato",
    });
  }
}

module.exports = { index, show, store, update, modify, destroy };