import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Obtener el origen de la solicitud
  const allowedOrigins = [
    'http://localhost:3000', // Desarrollo local
    'https://triton-blue.vercel.app',
    'https://tritonback.vercel.app', // Producción
    'https://api-triton.vercel.app'
  ];

  const origin = request.headers.get('origin');

  // Manejar solicitudes preflight OPTIONS
  if (request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Origin', '*'); // O usa 'origin' si necesitas restringirlo
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  // Verificar si el origen está permitido
  if (!allowedOrigins.includes(origin)) {
    console.error(`Origen no permitido: ${origin}`);
    return new Response('Origen no permitido', {
      status: 403,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-Type': 'text/plain',
      },
    });
  }

  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
