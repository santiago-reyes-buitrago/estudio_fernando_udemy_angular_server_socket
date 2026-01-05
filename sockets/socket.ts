import * as socket from 'socket.io';
import * as http from "node:http";
import {UserList} from "../core/models/user-list.model.js";
import {User} from "../core/models/user.model.js";

export const usersList = new UserList();


export class Socket {
    private static instance: Socket;
    private io: socket.Server;

    static getInstance(io?: http.Server) {
        if (!Socket.instance) {
            Socket.instance = new Socket(io!)
        }
        return Socket.instance;
    }

    private constructor(server: http.Server) {
        this.io = new socket.Server(server, {
            cors: {origin: true, credentials: true}
        });
        this.connectedSockets();
    }

    private listenSockets(event: string, callback: (...args: any[]) => void, io: socket.Server = this.io) {
        console.log('Escuchando evento tipo', event);
        io.on(event, callback)
    }

    private emitSockets(event: string, payload: any, io: socket.Server = this.io) {
        console.log('Emitiendo evento tipo', event);
        io.emit(event, payload)
    }

    private connectedSockets() {
        this.listenSockets('connection', cliente => {
            this.createClient(cliente);
            this.disconnectedSockets(cliente)
            this.listenMessages(cliente)
            this.listenLogin(cliente)
        })
    }

    private disconnectedSockets(client: any) {
        this.listenSockets('disconnect', () => {
            this.deleteClient(client);
        }, client)
    }

    private listenMessages(client: any) {
        this.listenSockets('message', (payload: any) => {
            console.log('Mensaje recibido', payload);
            this.emitSockets('message-new', payload);
        }, client)
    }

    private listenLogin(client: any) {
        this.listenSockets('login', (payload: any) => {
            usersList.updateNameUser(client.id, payload.name);
            console.log(usersList.getUsers())
            client.emit('login', payload);
        }, client)
    }

    private createClient(client: any) {
        const user = new User(client.id);
        usersList.addUser(user)
    }

    private deleteClient(client: any) {
        usersList.deleteUser(client.id);
    }

    get Io() {
        return this.io;
    }

}