import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        timeout: 30000,
        ssl: {
            rejectUnauthorized: true,
        },
        charset: 'utf8mb4_general_ci'
    }
});

export async function testConnection() {
    try {
        await conn.query('SELECT 1');
        console.log('Conexión exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

testConnection();