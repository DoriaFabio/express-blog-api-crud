const express = require("express");
const app = express();
const PORT = 5500;

//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:5500/

// il body di qualunque richiesta va parsato come application/json
app.use(express.json());

//rotte web
// const homeController = require("./controllers/homeController");
// app.get("/", homeController.index);

//rotte API
const postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);

// middlewares
const checkTime = require("./middlewares/checkTime");
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

app.use(checkTime);
app.use(errorsHandler);
app.use(notFound);

//rotta fallback
// app.all("*", (req, res) => {
//   res.status(404).send("<h1>Error 404 - Not Found !</h1>");
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});