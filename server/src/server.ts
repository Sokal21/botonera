import express from 'express';
import { join } from 'path';
import ps from 'play-sound';
import bodyParser from 'body-parser';
import gtts from 'node-gtts';
import cors from 'cors';

const esGtts = gtts("es");

const app = express();
const PORT = 3000;

const player = ps({
    player: "mplayer"
})

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${req.ip}`);
    next();
});

// Simple route for testing
app.post('/hambre', (req, res) => {
    player.play(join(__dirname, './assets/hambre.mp3'))
    res.send('HAMBRE!');
});

app.post('/macaco', (req, res) => {
    player.play(join(__dirname, './assets/alerta-do-macaco.mp3'))
    res.send('HAMBRE!');
});

app.post('/can-i-pet', (req, res) => {
    player.play(join(__dirname, './assets/can-i-pet-that-daw.mp3'))
    res.send('HAMBRE!');
});

app.post('/text-to-speech', (req, res) => {
    const filepath = join(__dirname, "temp.mp3");

    esGtts.save(filepath, req.body.text, function () {
        player.play(filepath)
        res.send('SE HABLO!');
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});