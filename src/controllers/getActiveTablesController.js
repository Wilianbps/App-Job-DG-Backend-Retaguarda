import getActiveTablesModels from "../models/getActiveTablesModels.js";

async function getActiveTables(req, res) {
  try {
    const queryTables = req.query;

    const result = await getActiveTablesModels.selectActiveModels(queryTables);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).end();
  }
}

export default { getActiveTables };
