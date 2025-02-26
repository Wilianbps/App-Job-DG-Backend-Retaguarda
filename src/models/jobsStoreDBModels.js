import connection from "./connection.js";

async function getAll() {
  const pool = await connection.openConnection();

  try {
    const users = await pool.request().query("SELECT * FROM USUARIO_DGCS");
    return users;
  } catch (error) {
    console.log(`Erro ao executar a consulta teste getAll${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function searchUsersOnStage(table, storeCode) {
  const pool = await connection.openConnection();

  try {
    const query = `SELECT TOP 50 * FROM STAGE WHERE (TABELA = '${table}' AND CODIGO_LOJA = '${storeCode}' AND STAGE_STATUS = 1)`;

    const result = await pool.request().query(query);

    console.log(query,table,storeCode)

    // Verifique se result e recordsets existem antes de acessar
    if (!result || !result.recordsets || result.recordsets.length === 0) {
      console.log("Nenhum dado encontrado ou erro na consulta.");
      return null;  // Ou lance um erro, dependendo do comportamento desejado
    }

    return result;  // Ou retornando result.recordsets[0] dependendo da necessidade
  } catch (error) {
    console.log(`Erro ao executar a consulta teste searchUsersOnStage${error.message}`);
    throw error;  // Relance o erro para que ele possa ser tratado no chamador
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}


async function searchUsersInTableUsers(id, table) {
  const pool = await connection.openConnection();

  try {

    const query = `SELECT * FROM ${table} WHERE ${id}`;
    
    console.log(query,id,table)

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta teste searchUsersInTableUsers ${error.message}`);
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
    console.log(`Erro ao executar a consulta teste updateStageStatus ${error.message}`);
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
