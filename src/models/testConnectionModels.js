import config from "../config.js";
import sql from "mssql";

async function testConnectionDatabase() {

    try {
      await sql.connect(config);
    } catch (error) {
      throw error;
    } finally {
      await sql.close();
      console.log("Conexão fechada");
    }

}

export default { testConnectionDatabase };
