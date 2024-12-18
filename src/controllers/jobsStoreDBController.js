import jobsStoreDBModels from "../models/jobsStoreDBModels.js";

async function getAllUsers(req, res) {
  const users = await jobsStoreDBModels.getAll();
  return res.status(200).json(users.recordsets);
}

async function searchOnStage(req, res) {
  try {
    const { table, storeCode } = req.query;

    // Verifica se os parâmetros necessários foram passados na query
    if (!table || !storeCode) return res.status(400).end();

    // Realiza a busca no banco de dados
    const usersOnStage = await jobsStoreDBModels.searchUsersOnStage(table, storeCode);

    if (!usersOnStage || !usersOnStage.recordsets || usersOnStage.recordsets.length === 0) {
      console.log("Nenhum resultado encontrado.");
      return res.status(404).json({ message: "Não havia dados" });
    }

    // Extrai os dados da primeira recordset
    const dataStage = usersOnStage.recordsets[0];

    const data = [];

    // Itera sobre cada linha dos dados para buscar informações adicionais
    for (const stageRow of dataStage) {
      const idCondition = stageRow.ID; // A cláusula completa do ID (e.g., "ID_AUX_ENTRADA = '10685'")
      console.log(`Buscando dados com ID Condition: ${idCondition}`);

      // Busca os dados na tabela correspondente
      const result = await jobsStoreDBModels.searchUsersInTableUsers(idCondition, table);

      if (result.recordset && result.recordset.length > 0) {
        const user = result.recordset[0];
        user.whereId = idCondition; // Adiciona a condição usada como referência
        data.push(user);
      } else {
        console.log(`Nenhum dado encontrado para ID Condition: ${idCondition}`);
      }
    }

    // Junta os dados da primeira consulta com os dados da segunda
    const mergedArray = data.map((item, index) => {
      return {
        ...item,
        stageId: dataStage[index].STAGE_ID,
        type: dataStage[index].TIPO,
        table,
      };
    });

    // Retorna a resposta para o cliente com os dados combinados
    return res.status(200).json(mergedArray);

  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro
    console.log("error", error);
    return res.status(400).send({ message: "Erro ao processar a solicitação." });
  }
}


async function updateStatusOnStage(req, res) {
  try {
    const data = req.body;

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
