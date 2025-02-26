import connection from "./connection.js";

async function selectAllActiveTables(status) {
  const pool = await connection.openConnection();

  try {
    const query = await pool.request().query(
      `SELECT ID_STAGE_TABLES AS id, NOME_TABELA AS tableName, ORDEM AS orderTable, STATUS AS status, TIPO AS type FROM STAGE_TABLES WHERE STATUS = 
         ${parseInt(status)} ORDER BY 3`
    );

    const tables = query.recordsets[0];

    return tables;
  } catch (error) {
    console.log(`Erro ao executar a consulta teste selectAllActiveTables${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function selectActiveTablesStore(table) {
  const pool = await connection.openConnection();
  try {
    const query = await pool
      .request()
      .query(
        `SELECT ID_STAGE_TABLES AS id, NOME_TABELA AS tableName, ORDEM AS orderTable, STATUS AS status, TIPO AS type FROM STAGE_TABLES WHERE STATUS = ${parseInt(
          table.status
        )} AND TIPO = '${table.type}'`
      );

    const tables = query.recordsets[0];

    return tables;
  } catch (error) {
    console.log(`Erro ao executar a consulta teste selectActiveTablesStore${error.message}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { selectActiveTablesStore, selectAllActiveTables };
