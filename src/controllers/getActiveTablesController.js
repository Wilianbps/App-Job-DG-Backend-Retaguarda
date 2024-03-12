import getActiveTablesModels from "../models/getActiveTablesModels.js";

async function getAllActiveTables(req, res) {
  try {
    const {status} = req.query;
    console.log(status);
    const result = await getActiveTablesModels.selectAllActiveTables(status);
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(400).end();
  }
}

async function getActiveTablesStore(req, res) {
  try {
    const queryTables = req.query;

    const result = await getActiveTablesModels.selectActiveTablesStore(queryTables);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).end();
  }
}

export default { getActiveTablesStore, getAllActiveTables };
