// backend/server.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("🚀 Servidor TurisChain en funcionamiento");
});

// Escucha en el puerto
app.listen(PORT, () => {
  console.log(`✅ Servidor backend ejecutándose en http://localhost:${PORT}`);
});
