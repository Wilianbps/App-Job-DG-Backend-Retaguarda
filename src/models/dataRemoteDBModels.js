import connection from "./connection.js";

async function insertDataInTable(data) {
  const pool = await connection.openConnection();

  console.log("dados chegou no model", data);

  const identifyOn = `SET IDENTITY_INSERT ${data.table} ON;`;
  const identifyOff = `SET IDENTITY_INSERT ${data.table} OFF;`;

  try {
    const { stageId, type, table, whereId, ...copyData } = data;

    const query = `${identifyOn} INSERT INTO ${data.table} (${Object.keys(
      copyData
    ).join(", ")}) VALUES (${Object.values(copyData)
      .map((value) => (value === null ? 'NULL' : `'${value}'`))
      .join(", ")}) ${identifyOff}`;

    console.log("query", query);

    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

async function updateDataInTable(data) {
  const pool = await connection.openConnection();

  try {
    const { stageId, type, table, whereId, ...copyData } = data;

    console.log("WHERE DENTRO DO MODEL", whereId);

    const keys = Object.keys(copyData);
    const values = Object.values(copyData);
    let updateValues = "";

    // Construir a string para a parte SET do update
    for (let i = 1; i < keys.length; i++) {
      updateValues += `${keys[i]} = '${values[i]}'`;
      if (i !== keys.length - 1) {
        updateValues += ", ";
      }
    }

    const query = `UPDATE ${data.table} SET ${updateValues} WHERE ${whereId}`;
    const result = await pool.request().query(query);

    return result;
  } catch (error) {
    console.log(`Erro ao executar a consulta ${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { insertDataInTable, updateDataInTable };
