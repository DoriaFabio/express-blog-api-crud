const express = require("express");
const app = express();
const PORT = 5500;

const postsRouter = require("./routers/posts");
//definisco dove sono gli asset statici
app.use(express.static("public")); //http://localhost:5500/

// il body di qualunque richiesta va parsato come application/json
app.use(express.json());

//rotte API
app.use("/posts", postsRouter);


//rotta fallback
app.all("*", (req, res) => {
  res.status(404).send("<h1>Error 404 - Not Found !</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});