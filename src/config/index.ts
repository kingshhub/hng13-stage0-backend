import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    email: process.env.EMAIL || 'formulaking07@gmail.com',
    name: process.env.NAME || 'Kingsley Simeon',
    stack: process.env.STACK || 'Node.js/Express',
};