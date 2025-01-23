const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
//const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//app.use('/api/auth', authRoutes);

const pool = mysql.createPool({
    host: process.env.DB_HOST,     
    user: process.env.DB_USER,     
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT,    
});

app.get('/api/test-connection', async (req, res) => {
try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.status(200).json({ success: true, message: 'Conexión exitosa', result: rows[0].result });
} catch (error) {
    console.error('Error en la conexión:', error);
    res.status(500).json({ success: false, message: 'Error en la conexión' });
}
});
  
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

