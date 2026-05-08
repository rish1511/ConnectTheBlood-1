const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const authRoutes = require(
  "./modules/auth/auth.routes"
);

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blood Connect API Running");
});

app.use("/api/v1/auth", authRoutes);

module.exports = app;