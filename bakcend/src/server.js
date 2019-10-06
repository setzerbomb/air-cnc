const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://set:2qZT9AXNwY@oministack-yeene.mongodb.net/random?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtro)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (criação, edição)

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3333);
