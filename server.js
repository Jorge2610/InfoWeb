const { createServer } = require('node:http');
const next = require('next');
const { parse } = require('url');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handler(req, res, parsedUrl);
    });

    const io = new Server(server);

    io.on("connection", async (socket) => {
        console.log('Cliente conectado: ' + socket.id);

        socket.on("control-reserva", (msg) => {
            socket.broadcast.emit("bloquear-reserva", msg);
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado: ' + socket.id);
        });
    });

    server
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});