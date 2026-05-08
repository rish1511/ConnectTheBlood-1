const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Blood Connect API Running");
});


const setupRoutes = require("./routes/index");
setupRoutes(app);

module.exports = app;