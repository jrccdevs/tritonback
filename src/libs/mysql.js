import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: process.env.NEXT_PUBLIC_DB_HOST || "localhost",
        user: process.env.NEXT_PUBLIC_DB_USER || "root",
        password: process.env.NEXT_PUBLIC_DB_PASSWORD || "",
        database: process.env.NEXT_PUBLIC_DB_NAME || "boliviandcode_tritondb",
        port: process.env.NEXT_PUBLIC_DB_PORT || 3306,
        timeout: 10000, // Aumentar el tiempo de espera de la conexión si es necesario

    }
})
