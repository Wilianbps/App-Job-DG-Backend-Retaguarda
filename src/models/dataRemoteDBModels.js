import connection from "./connection.js";

/* async function insertDataInTable(data) {
  const pool = await connection.openConnection();

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
} */

 /*  async function insertDataInTable(data) {
    const pool = await connection.openConnection();
  
    const identifyOn = `SET IDENTITY_INSERT ${data.table} ON;`;
    const identifyOff = `SET IDENTITY_INSERT ${data.table} OFF;`;
  
    let attempt = 0;
    const maxAttempts = 3;  // Número máximo de tentativas em caso de deadlock
  
    while (attempt < maxAttempts) {
      try {
        const { stageId, type, table, whereId, ...copyData } = data;
  
        const query = `${identifyOn} INSERT INTO ${data.table} (${Object.keys(copyData).join(", ")}) 
                       VALUES (${Object.values(copyData).map(value => value === null ? 'NULL' : `'${value}'`).join(", ")}) ${identifyOff}`;
  
        console.log("query", query);
  
        const result = await pool.request().query(query);
  
        // Se a consulta for bem-sucedida, sai do loop
        return result;
      } catch (error) {
        if (error.code === "40001" || error.message.includes("deadlock")) {
          // Deadlock detectado, tenta novamente
          console.warn(`Deadlock detectado. Tentativa ${attempt + 1} de ${maxAttempts}`);
          attempt++;
          if (attempt >= maxAttempts) {
            console.error("Número máximo de tentativas de retry atingido.");
            throw new Error('Falha após múltiplas tentativas devido a deadlock');
          }
        } else {
          // Erro diferente de deadlock, lança o erro
          console.error("Erro ao executar a consulta:", error);
          throw error;
        }
      }
    }
  } */
  
    async function insertDataInTable(data) {
      const pool = await connection.openConnection();
    
      const identifyOn = `SET IDENTITY_INSERT ${data.table} ON;`;
      const identifyOff = `SET IDENTITY_INSERT ${data.table} OFF;`;
    
      let attempt = 0;
      const maxAttempts = 3;
      const retryDelay = 2000; // 2 segundos de delay entre tentativas
    
      while (attempt < maxAttempts) {
        try {
          const { stageId, type, table, whereId, ...copyData } = data;
    
          const query = `${identifyOn} INSERT INTO ${data.table} (${Object.keys(copyData).join(", ")}) 
                         VALUES (${Object.values(copyData).map(value => value === null ? 'NULL' : `'${value}'`).join(", ")}) ${identifyOff}`;
    
          console.log("query", query);
    
          const result = await pool.request().query(query);
          
          return result; // Sucesso, retorna o resultado da query
        } catch (error) {
          if (error.code === "40001" || error.message.includes("deadlock")) {
            console.warn(`Deadlock detectado. Tentativa ${attempt + 1} de ${maxAttempts}`);
            attempt++;
    
            if (attempt < maxAttempts) {
              // Delay de 2 segundos antes de tentar novamente
              await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
              console.error("Número máximo de tentativas de retry atingido.");
              throw new Error('Falha após múltiplas tentativas devido a deadlock');
            }
          } else {
            console.error("Erro inesperado:", error);
            throw error;
          }
        }
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
    console.log(`Erro ao executar a consulta teste updateDataInTable${error}`);
  } finally {
    await connection.closeConnection(pool);
    console.log("Conexão fechada");
  }
}

export default { insertDataInTable, updateDataInTable };
