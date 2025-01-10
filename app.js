const express = require("express");
const app = express();
const PORT = 5500;

// middlewares
const corsPolicy = require("./middlewares/corsPolicy");
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");
const postsRouter = require("./routers/posts");
const tagsRouter = require("./routers/tags");

//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:5500/

app.use(corsPolicy);

// il body di qualunque richiesta va parsato come application/json
app.use(express.json());

//rotte API
app.use("/posts", postsRouter);
app.use("/tags", tagsRouter);

app.use(errorsHandler);

app.use(notFound);

//rotte web
// const homeController = require("./controllers/homeController");
// app.get("/", homeController.index);

//rotta fallback
// app.all("*", (req, res) => {
//   res.status(404).send("<h1>Error 404 - Not Found !</h1>");
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});