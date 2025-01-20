import dataRemoteDBModels from "../models/dataRemoteDBModels.js";

async function insertRegisterInRemoteDB(req, res) {
  try {
    const dataUsers = req.body;

    console.log(dataUsers)

    if (Object.keys(dataUsers).length === 0)
      return res.status(200).json({ message: "Não havia dados " });

    dataUsers.forEach(async (item, index) => {
      if (item.type == "I") {
        await dataRemoteDBModels.insertDataInTable(dataUsers[index]);
        return res.status(200).send();
      } else if (item.type == "U") {
        await dataRemoteDBModels.updateDataInTable(dataUsers[index]);
        return res.status(200).send();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

export default { insertRegisterInRemoteDB };
