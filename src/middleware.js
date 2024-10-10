import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Obtener el origen de la solicitud
  const allowedOrigins = [
    'http://localhost:3000', // Desarrollo local
    'https://triton-blue.vercel.app' // Producción
  ];

  const origin = request.headers.get('origin');
  
  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } else {
    // Si el origen no está permitido, podrías devolver un error, pero en este caso lo ignoramos.
    console.warn(`Origen no permitido: ${origin}`);
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
