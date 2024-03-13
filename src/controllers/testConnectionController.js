import testConnectionModels from "../models/testConnectionModels.js";

async function testConnection(_req, res) {
  setTimeout(async () => {
    try {
      await testConnectionModels.testConnectionDatabase();

      res.status(200).json({ message: "Conexão com o banco da retaguarda feita com sucesso!" });
    } catch (error) {
      res.status(400).json({ message:  "Erro ao configurar conexão com o banco da retaguarda. Verifique as informações de conexão fornecidas!" });
    }
  }, [1000]);
}

export default { testConnection };
