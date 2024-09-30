import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
      const query = `
        SELECT 
          p.id AS product_id,
          p.name AS product_name,
          p.price,
          p.main_image,
          p.description,
          
          -- Imágenes del producto por color
          GROUP_CONCAT(DISTINCT CONCAT('Color: ', pi.color, ', URL: ', pi.image_url) SEPARATOR '; ') AS product_images,
          
          -- Miniaturas de colores
          GROUP_CONCAT(DISTINCT CONCAT('Color: ', ci.color, ', Thumbnail: ', ci.color_image_url) SEPARATOR '; ') AS color_thumbnails,
          
          -- Tallas del producto
          GROUP_CONCAT(DISTINCT ps.size ORDER BY ps.size ASC SEPARATOR ', ') AS sizes,
          
          -- Categorías del producto
          GROUP_CONCAT(DISTINCT c.name SEPARATOR ', ') AS categories
  
        FROM 
          products p
  
        -- Unir imágenes de productos
        LEFT JOIN product_images pi ON p.id = pi.product_id
  
        -- Unir miniaturas de colores
        LEFT JOIN color_images ci ON p.id = ci.product_id
  
        -- Unir tallas de productos
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
  
        -- Unir la relación entre productos y categorías
        LEFT JOIN product_categories pc ON p.id = pc.product_id
  
        -- Unir la tabla de categorías
        LEFT JOIN categories c ON pc.category_id = c.id
  
        -- Filtro por ID del producto
        WHERE p.id = ?
  
        GROUP BY p.id
      `;
  
      const [result] = await conn.query(query, [params.id]);
  
      if (!result) {
        return NextResponse.json(
          {
            message: "Producto no encontrado",
          },
          {
            status: 404,
          }
        );
      }
  
      return NextResponse.json(result);
    } catch (error) {
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

export async function GETTER(request, { params })  {
   
    try {
        const result= await conn.query("SELECT *FROM product WHERE id = ?", [
            params.id,
        ]);
    
        if(result.length === 0){
            return NextResponse.json({
                message: "producto no encontrado",
    
            },
            {
                status: 404,
            });
        }
    
        return NextResponse.json(result[0])
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {status: 500
            }
        );
    }
}

export async function DELETE (require, {params}) {

 try {
    const result =await conn.query("DELETE FROM product WHERE id = ?", [
        params.id,
    ]);
  
    if(result.affectedRows === 0){
        return NextResponse.json(
            {
                message: "Producto no emcontrado",
            },
            {
                status: 404,
            }
        );
    }
  
    return new Response(null, {
        status:204
    });
 } catch (error) {
     return NextResponse.json(
         {
             message: error.message,
         },
         {
             status: 500
         }
     )
 }

}

export async function PUT(request, {params}) {

 try {
    const data = await request.json();

    const result  = await conn.query("UPDATE product SET ? WHERE id = ?", [
      data,  params.id,
    ]);
 
    if(result.affectedRows === 0){
        return NextResponse.json(
            {
                message: "Producto no Encontrado",
            },
            {status: 404
         }
        );
    }
    const updateProduct = await conn.query("SELECT * FROM product WHERE id = ?",
    [params.id]);
 
    return NextResponse.json(updateProduct[0]);
 
 } catch (error) {
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