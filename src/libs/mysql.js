import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "boliviandcode_tritondb",
        port: process.env.DB_PORT || 3306,
        timeout: 10000, // Aumentar el tiempo de espera de la conexión si es necesario

    }
})

