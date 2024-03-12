import jobsStoreDBModels from "../models/jobsStoreDBModels.js";

async function getAllUsers(req, res) {
  const users = await jobsStoreDBModels.getAll();
  return res.status(200).json(users.recordsets);
}

async function searchOnStage(req, res) {
  try {
    const { table, storeCode } = req.query;

    if (!table || !storeCode) return res.status(400).end();

    const usersOnStage = await jobsStoreDBModels.searchUsersOnStage(
      table,
      storeCode
    );

    const dataStage = usersOnStage.recordsets[0];

    const data = [];

    if (dataStage.length > 0) {
      for (let i = 0; i < dataStage.length; i++) {
        const id = dataStage[i].ID;
        const result = await jobsStoreDBModels.searchUsersInTableUsers(id, table);
        data.push(result.recordset[0]);
      }

      const mergedArray = data.map((item, index) => {
        return {
          ...item,
          stageId: dataStage[index].STAGE_ID,
          type: dataStage[index].TIPO,
          table,
        };
      });

      return res.status(200).json(mergedArray);
    } else {
      return res.status(200).json({ message: "Não havia dados" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).send();
  }
}

async function updateStatusOnStage(req, res) {
  try {
    const data = req.body;

    console.log("dataUsers", data);

    if (!data) return res.status(400).send();

     if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const id = data[i].stageId;
        await jobsStoreDBModels.updateStageStatus(id);
      }
      return res.status(200).end();
    } else {
      return res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
}

export default { getAllUsers, searchOnStage, updateStatusOnStage };
