import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
  const { category } = params;
  console.log("Categoría solicitada:", category);

  try {
    const query = `
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        p.main_image,
        p.description
      FROM 
        products p
      INNER JOIN product_categories pc ON p.id = pc.product_id
      INNER JOIN categories c ON pc.category_id = c.id
      WHERE c.name = ?
    `;

    // Ejecutar la consulta
    const result = await conn.query(query, [category.trim()]);
    
    // Verifica cómo está estructurado el resultado
    console.log("Resultado de la consulta:", result);
    
    //const rows = Array.isArray(result[0]) ? result[0] : [result[0]]; // Asegurarse de que rows sea un array

    console.log("Número de productos encontrados:", result.length);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "No se encontraron productos en esta categoría",
        },
        {
          status: 404,
        }
      );
    }

    // Devolver el total de productos y los productos mismos
    return NextResponse.json({
    //  totalProducts: result.length,
      products: result,
    });
    
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
