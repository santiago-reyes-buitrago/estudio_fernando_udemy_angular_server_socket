import * as socket from 'socket.io';
import * as http from "node:http";


export class Socket {
    private static instance: Socket;
    private io: socket.Server;

    static getInstance(io: http.Server) {
        if (!Socket.instance) {
            Socket.instance = new Socket(io)
        }
        return Socket.instance;
    }

    private constructor(server: http.Server) {

        this.io = new socket.Server(server);
    }

    private listenSockets(event: string, callback: (...args: any[]) => void) {
        console.log('Escuchando evento', event);
        this.io.on(event, callback);
    }

    private connectedSockets() {
        this.listenSockets('connection', cliente => {
            console.log('Cliente conectado');
        })
    }
}