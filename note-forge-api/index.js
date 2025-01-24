const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para probar la conexión a la base de datos
app.get('/api/test-connection', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.status(200).json({ success: true, message: 'Conexión exitosa', result: rows[0].result });
  } catch (error) {
    console.error('Error en la conexión:', error);
    res.status(500).json({ success: false, message: 'Error en la conexión' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
