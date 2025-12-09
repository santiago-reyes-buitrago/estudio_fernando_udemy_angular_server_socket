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
        this.io = new socket.Server(server,{
            cors: {origin: true, credentials: true}
        });
        this.connectedSockets();
    }

    private listenSockets( event: string, callback: (...args: any[]) => void,io:socket.Server = this.io) {
        console.log('Escuchando evento tipo', event);
        io.on(event, callback)
    }

    private emitSockets(event: string, payload: any,io:socket.Server = this.io) {
        console.log('Emitiendo evento tipo', event);
        io.emit(event, payload)
    }

    private connectedSockets() {
        this.listenSockets('connection', cliente => {
            console.log('Cliente conectado');
            this.disconnectedSockets(cliente)
            this.listenMessages(cliente)
            this.listenLogin(cliente)
        })
    }

    private disconnectedSockets(client:any) {
        this.listenSockets('disconnect', () => {
            console.log('Cliente desconectado');
        },client)
    }

    private listenMessages(client:any) {
        this.listenSockets('message', (payload:any) => {
            console.log('Mensaje recibido', payload);
            this.emitSockets('message-new',payload);
        },client)
    }

    private listenLogin(client:any) {
        this.listenSockets('login', (payload:any) => {
            console.log('Login recibido', payload);
            client.emit('login',payload);
        },client)
    }
}