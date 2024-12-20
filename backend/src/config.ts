import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const config = {
  port: process.env.PORT || 3001, // Valor por defecto si no está definido
  frontendOrigin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_ORIGIN_PRODUCTION
    : process.env.FRONTEND_ORIGIN,
};

export default config;
