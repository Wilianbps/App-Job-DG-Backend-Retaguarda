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

async function searchUsersInTableUsers(id) {
  const pool = await connection.openConnection();

  try {
  /*   const query = `SELECT * FROM USUARIO_DGCS WHERE ID_USUARIO_DGCS = ${id}`; */
    const query = `SELECT * FROM USUARIO_DGCS WHERE ${id}`;

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
    const query = `UPDATE STAGE SET STAGE_STATUS = 2 WHERE ID = ${id}`;

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { getAll, searchUsersOnStage, searchUsersInTableUsers, updateStageStatus};
