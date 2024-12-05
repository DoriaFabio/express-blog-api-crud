const blog = require("../data/post.js"); //i vostri posts

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
  //pizzas/1/
  //console.log(req.params);
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
  res.send("Creazione nuovo post");
}

function update(req, res) {
  res.send("Modifica integrale del post con id: " + req.params.id);
}
function destroy(req, res) {
  //res.send("Cancellazione della pizza con id: " + req.params.id);
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

module.exports = { index, show, store, update, destroy };