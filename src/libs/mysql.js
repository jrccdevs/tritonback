import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: process.env.NEXT_PUBLIC_DB_HOST,
        user: process.env.NEXT_PUBLIC_DB_USER,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        database: process.env.NEXT_PUBLIC_DB_NAME,
        timeout: 10000, // Aumentar el tiempo de espera de la conexión si es necesario

    }
})

