import express from "express";  // index.js

// middlewares
import errorsHandler from "./middlewares/errorsHandler.js";
import corsPolicy from "./middlewares/corsPolicy.js";
import notFound from "./middlewares/notFound.js";
// Router
import productRouter from "./routers/product.js";

const app = express();
const PORT = process.env.PORT || 3000;


//definisco dove sono gli asset statici
app.use(express.static("public")); 

// Cors
app.use(corsPolicy);

// il body di qualunque richiesta va parsato come application/json
app.use(express.json());

//rotte API
app.use("/product", productRouter);

// 404
app.use(notFound);
// Gestore centrale errori
app.use(errorsHandler);

// Avvio server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});