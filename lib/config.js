import fs from 'node:fs/promises';

export async function load_env_config() {
    const file = './dist/login_dialog/main.js';
    let data;

    try {
        data = await fs.readFile(file, { encoding: 'utf8' });
    } catch (err) {
        console.error(err);
    }

    const res = data
        .replace(/\$CLIENT_ID/g, process.env.CLIENT_ID)
        .replace(/\$AUTHORITY/g, process.env.AUTHORITY)
        .replace(/\$REDIRECT_URI/g, process.env.REDIRECT_URI);

    try {
        await fs.writeFile(file, res);
    } catch (err) {
        console.error(err);
    }
}