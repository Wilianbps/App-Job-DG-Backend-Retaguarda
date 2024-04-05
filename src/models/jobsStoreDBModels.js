import connection from "./connection.js";

async function getAll() {
  const pool = await connection.openConnection();

  try {
    const users = await pool.request().query("SELECT * FROM USUARIO_DGCS");
    return users;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function searchUsersOnStage(table, storeCode) {
  const pool = await connection.openConnection();

  try {
    const query = `SELECT * FROM STAGE WHERE (TABELA ='${table}' AND CODIGO_LOJA = '${storeCode}' AND STAGE_STATUS = 1)`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function searchUsersInTableUsers(id, table) {
  const pool = await connection.openConnection();

  try {
  
    const query = `SELECT * FROM ${table} WHERE ${id}`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function updateStageStatus(id) {
  const pool = await connection.openConnection();

  try {
    const dateProcessed = new Date().toISOString();
    const query = `UPDATE STAGE SET STAGE_STATUS = 2, DATA_PROCESSADO = '${dateProcessed}' WHERE STAGE_ID = ${id}`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default {
  getAll,
  searchUsersOnStage,
  searchUsersInTableUsers,
  updateStageStatus,
};
