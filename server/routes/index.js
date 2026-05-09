const express = require("express");
const { API_VERSION } = require("../constants/api.constants");
const authRoutes = require(
  "../modules/auth/auth.routes"
);


const setupRoutes = (app) => {
  app.use(`/api/${API_VERSION}/auth`, authRoutes);
  
};

module.exports = setupRoutes;
