import {Router} from "express";
import {Socket} from "../sockets/socket.js";

export const messageRouter = Router();

messageRouter.get('/message', (req, res) => {
    res.json({
        ok: true,
        message: 'GET - Hola desde el servidor'
        });
})

messageRouter.post('/message', (req, res) => {
    console.log(req.body);
    res.json({
        ok: true,
        message: 'POST - Hola desde el servidor',
        body: req.body
    });
})

messageRouter.post('/message/:id', (req, res) => {
    const {id} = req.params;
    const {from,msg} = req.body;
    const socket = Socket.getInstance();
    socket.Io.in(id).emit('private-message', {from,msg});
    res.json({
        ok: true,
        message: 'POST - Hola desde el servidor',
        body: req.body
    });
})