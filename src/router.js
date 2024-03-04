import express from "express";
import jobsUsersController from "./controllers/jobsUsersController.js";
import config from "./configs/config.js";
import configConnectionDBController from "./controllers/configConnectionDBController.js";
import testConnectionController from "./controllers/testConnectionController.js";

const router = express.Router();

router.get("/form-data-config", (req, res) => {
  const objectConfig = {
    user: config.user,
    password: config.password,
    server: config.server,
    database: config.database,
  };

  res.status(200).json(objectConfig);
});

router.get(
  "/test-connection-database",
  testConnectionController.testConnection
);

router.post(
  "/configuracao-conexao-db",
  configConnectionDBController.VerifyConnectionDB
);

router.get("/users", jobsUsersController.searchUsersOnStage);
router.get("/jobs/users", jobsUsersController.getAllUsers);

router.post("/users", jobsUsersController.updateStatusOnStage);

export default router;
