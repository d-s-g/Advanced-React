require('dotenv').config({path: '.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, server_info => {
    console.log(`Server is now running on port http://localhost:${server_info.port}`);
});
