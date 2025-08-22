
import express from "express";
import princesas from "./src/data/princesas.js"

const app = express();
app.use(express.json());

const serverPort = 3000;

app.get("/", (req, res) => {
    res.send(`Bem-vindos(as) ao reino mágico das Princesas Disney! ✨👑`);
});
app.get("/princesas", (req, res) => {
    res.json(princesas)
});

app.get("/princesas/:id", (req, res) =>{
  let id = req.params.id;
  id = parseInt(id)
  const princesa = princesas.find(b => b.id === id);

  if(princesa) {
      res.status(200).json(princesa);
  } else {
    res.status(400).json({
      mensagem:"princesa não encontrado"
    });
  }
});

app.get("/princesas/nome/:nome", (req, res) => {
  let nome = req.params.nome.toLowerCase();

  const princesasEncontradas = princesas.filter(b => 
      b.nome.toLowerCase().includes(nome)
  );

  if (princesasEncontradas.length > 0) {
      res.status(200).json(princesasEncontradas);
  } else {
      res.status(404).json({
          mensagem: "Princesa(s) não encontrada!"
      });
  }
});

app.get("/princesas/reino/:casa", (req, res) => {
  let casa = req.params.reino;
  const PrincesasReino = princesas.filter(b => b.reino.toLowerCase() === reino.toLowerCase());
  
  if (PrincesasReino.length > 0) {
      res.status(200).json(PrincesasReino);
  } else {

      res.status(404).json({
          mensagem: "Nenhuma princesa encontrado nesse reino!"
      })
  }
});


app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} !!!`);
});