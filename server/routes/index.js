const express = require("express");

const authRoutes = require(
  "../modules/auth/auth.routes"
);


const setupRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  
};
module.exports = setupRoutes;
