const express = require("express");
const {
  API_VERSION,
} = require(
  "../constants/api.constants"
);

const authRoutes = require(
  "../modules/auth/auth.routes"
);

const donorRoutes = require(
  "../modules/donor/donor.routes"
);

const requestRoutes = require(
  "../modules/request/request.routes"
);

const recipientRoutes = require(
  "../modules/recipient/recipient.routes"
);

const adminRoutes = require(
  "../modules/admin/admin.routes"
);
const notificationRoutes = require(
  "../modules/notification/notification.routes"
);

const setupRoutes = (app) => {
  app.use(
    `/api/${API_VERSION}/auth`,
    authRoutes
  );

  app.use(
    `/api/${API_VERSION}/donor`,
    donorRoutes
  );

  app.use(
    `/api/${API_VERSION}/requests`,
    requestRoutes
  );

  app.use(
    `/api/${API_VERSION}/recipient`,
    recipientRoutes
  );

  app.use(
    `/api/${API_VERSION}/admin`,
    adminRoutes
  );

  app.use(
    `/api/${API_VERSION}/notifications`,
    notificationRoutes
  );
};

module.exports = setupRoutes;
