import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Define los orígenes permitidos
  const allowedOrigins = [
    'http://localhost:3000', // Origen del frontend en desarrollo
    'https://triton-blue.vercel.app', // Origen de producción
  ];

  const origin = request.headers.get('origin');

  // Manejar solicitudes preflight OPTIONS
  if (request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : '*');
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
