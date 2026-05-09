const express = require("express");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.send("Blood Connect API Running");
});


const setupRoutes = require("./routes/index");
setupRoutes(app);



app.use(errorMiddleware);
module.exports = app;