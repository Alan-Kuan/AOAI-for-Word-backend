import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import * as dotenv from 'dotenv';
import { load_env_config } from './lib/config.js';
import { verify_token } from './lib/verify.js';

dotenv.config();
await load_env_config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, 'dist');

const PORT = 80;
const rand_code = Math.floor(Math.random() * 100000000);

const app = express();

app.set('view engine', 'ejs');

const public_dir = [
    'assets',
    'login',
    'login_dialog',
];

for (const dir of public_dir) {
    app.use(`/${dir}`, express.static(path.join(root, dir)));
}

app.get(`/`, async (req, res) => {
    const token = req.query.token;
    const verified = await verify_token(token);
    if (!verified) {
        res.redirect('/login');
        return;
    }
    res.render('index', { code: rand_code });
});

app.get(`/main.js`, (req, res) => {
    const code = req.query.code;
    if (!code || parseInt(code, 10) !== rand_code) {
        console.log('Random code did not match');
        res.sendStatus(401);
        return;
    }
    const file_path = path.join(root, 'main.js');
    res.sendFile(file_path);
});

app.all('*', (_, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));