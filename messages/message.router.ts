import {Router} from "express";

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
    console.log(req.params);
    res.json({
        ok: true,
        message: 'POST - Hola desde el servidor',
        body: req.body
    });
})