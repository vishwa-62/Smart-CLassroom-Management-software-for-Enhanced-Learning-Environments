const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'smart_classroom',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
};

const pool = mysql.createPool(dbConfig);

// Helper function to test DB connectivity
const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database successfully:', process.env.DB_NAME || 'smart_classroom');
    connection.release();
    return true;
  } catch (error) {
    console.warn('⚠️  MySQL Connection Error:', error.message);
    console.warn('💡 Tip: Ensure MySQL server is running and database `smart_classroom` is created using database/schema.sql');
    return false;
  }
};

module.exports = {
  pool,
  checkConnection
};
