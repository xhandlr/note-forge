const mysql = require('mysql2/promise');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  quiet: true
});

/**
 * Database configuration
 * Create a MySQL connection pool
 * Development and test use separate databases
 */

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'note_forge',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'note_forge',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function testConnection(retries = 5, delay = 5000) {
  while (retries > 0) {
    try {
      const conn = await pool.getConnection();
      console.log('✅ Conexión a la DB exitosa!');
      conn.release();
      return;
    } catch (err) {
      retries--;
      console.error(`❌ Error al conectar a la DB (${err.message}). Reintentos restantes: ${retries}`);
      if (retries === 0) {
        console.error('🔴 No se pudo conectar a la DB, saliendo...');
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  testConnection();
}
module.exports = pool;
