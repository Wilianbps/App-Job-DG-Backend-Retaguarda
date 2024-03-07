import jobsUsersModels from "../models/jobsUsersModels.js";

async function getAllUsers(req, res) {
  const users = await jobsUsersModels.getAll();
  return res.status(200).json(users.recordsets);
}

async function searchUsersOnStage(req, res) {
  try {
    const { table, storeCode } = req.query;

    if (!table || !storeCode) return res.status(400).end();

    const usersOnStage = await jobsUsersModels.searchUsersOnStage(
      table,
      storeCode
    );

    const data = usersOnStage.recordsets[0];

    const users = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const id = data[i].ID;
        const userData = await jobsUsersModels.searchUsersInTableUsers(id);
        users.push(userData.recordset[0]);
      }

      return res.status(200).json(users);
    } else {
      return res.status(200).json({ message: "Não havia dados" });
    }
  } catch (error) {
    console.log("error", error)
    return res.status(400).send();
  }
}

async function updateStatusOnStage(req, res) {
  try {
    const dataUsers = req.body;

    if (!dataUsers) return res.status(400).end();

    if (dataUsers.length > 0) {
      for (let i = 0; i < dataUsers.length; i++) {
        const id = dataUsers[i].ID_USUARIO_DGCS;
        await jobsUsersModels.updateStageStatus(id);
      }
      return res.status(200).end();
    } else {
      return res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
}

export default { getAllUsers, searchUsersOnStage, updateStatusOnStage };
