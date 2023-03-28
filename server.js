import express from 'express';

const PORT = 80;
const app = express();

app.use(express.static('dist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));