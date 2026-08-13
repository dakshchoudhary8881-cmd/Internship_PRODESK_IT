import dotenv from 'dotenv';
dotenv.config();
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://sprint-14-client-9f0b4ef01-dakshchoudhary8881-cmds-projects.vercel.app',
  'https://sprint-14-client.vercel.app',
  'http://localhost:5173'
].filter(Boolean);
const origin = 'https://sprint-14-client-9f0b4ef01-dakshchoudhary8881-cmds-projects.vercel.app';
console.log(allowedOrigins);
console.log('Includes:', allowedOrigins.includes(origin));
