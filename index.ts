import {Server} from "./Server/server.js";
import {ROUTES_SERVER} from "./Server/constants/routesServer.constant.js";

const PORT = Number(process.env.PORT) || 3000;

const server =  new Server(PORT);
// server.addConfiguration(cors({
//     origin: true,
//     credentials: true
// }))

ROUTES_SERVER.forEach(route => server.addRoute(route));

server.deployRoutes();

server.start(() => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
})