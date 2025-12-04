import {Server} from "./Server/server.js";
import {ROUTES_SERVER} from "./Server/constants/routesServer.constant.js";
import {Socket} from "./sockets/socket.js";


const PORT = Number(process.env.PORT) || 3000;

const server = Server.getInstance(PORT);
Socket.getInstance(server.getServer())

ROUTES_SERVER.forEach(route => server.addRoute(route));

server.deployRoutes();

server.start(() => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
})