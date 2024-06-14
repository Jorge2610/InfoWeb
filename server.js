const { createServer } = require('node:http');
const next = require('next');
const { parse } = require('url');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const reservas = new Map();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handler(req, res, parsedUrl);
    });

    const io = new Server(server);

    io.on("connection", async (socket) => {
        console.log('Cliente conectado: ' + socket.id);

        socket.on("reservas-en-proceso", (msg, callback) => {
            const aux = reservas.get(msg.key);
            aux === undefined ? reservas.set(msg.key, msg.data) : null;
            callback(aux);
        });

        socket.on("reservando", (msg) => {
            const aux = reservas.get(msg.key);
            aux[msg.index] = msg.value;
            socket.broadcast.emit("actualizar-datos", aux);
        });

        socket.on("reserva-cancelada", (msg) => {
            const aux = reservas.get(msg.key);
            aux[msg.index].proceso = false;
            socket.broadcast.emit("actualizar-datos", aux);
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