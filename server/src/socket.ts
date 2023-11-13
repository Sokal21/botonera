import { Server, Socket } from 'socket.io';
import fs from "fs"
import path, { join } from 'path';

export const io = new Server({ cors: "*" });

const users = new Map<string, string>();

setInterval(() => {
    for (const [user, socketId] of users.entries()) {
        const socket = io.sockets.sockets.get(socketId)

        console.log(user, socketId, socket?.connected);

        if (!socket?.connected) {
            users.delete(user);
        }
    }

    renderFile();
}, 2000)

export const sendFile = async (filePath: string, socket: Socket) => {
    // Read the file asynchronously
    const data = await fs.promises.readFile(filePath);

    // Emit the file data to the client
    socket.emit('file-transfer', { filename: path.basename(filePath), filedata: data });
};

const renderFile = async () => {
    const entries = []

    for (const [user, socket] of users.entries()) {
        entries.push(`User: ${user} connected with socket id: ${socket}`)
    }


    await fs.promises.writeFile(join(__dirname, "./users"), entries.join('\n'))

}

io.on("connection", async (socket) => {

    const user = socket.handshake.query.user as string;

    if (user && users.has(user)) {
        users.delete(user);
    }

    users.set(user, socket.id)

    if (user) {
        await renderFile()
    }

    socket.on("disconnect", (reason) => {
        users.delete(user);
    });
});


io.listen(3001);