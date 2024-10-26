import { conn } from 'path/to/your/mysql/connection/file';

export default async function handler(req, res) {
    try {
        // Intenta realizar una consulta simple, como seleccionar la fecha actual
        const result = await conn.query('SELECT NOW() AS currentTime');
        await conn.end(); // Asegúrate de cerrar la conexión
        res.status(200).json({ message: 'Conexión exitosa', data: result });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        res.status(500).json({ message: 'Error de conexión', error: error.message });
    }
}