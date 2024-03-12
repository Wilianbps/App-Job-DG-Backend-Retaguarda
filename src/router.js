import express from "express";
import jobsStoreDBController from "./controllers/jobsStoreDBController.js";
import config from "./configs/config.js";
import configConnectionDBController from "./controllers/configConnectionDBController.js";
import testConnectionController from "./controllers/testConnectionController.js";
import getActiveTablesController from "./controllers/getActiveTablesController.js";

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

router.get("/search-on-stage", jobsStoreDBController.searchOnStage);
router.put("/update-Status-On-Stage", jobsStoreDBController.updateStatusOnStage);
router.get("/jobs/get-all-users", jobsStoreDBController.getAllUsers);
router.get("/active-store-tables", getActiveTablesController.getActiveTables);

export default router;
