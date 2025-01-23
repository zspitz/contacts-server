import express, { json } from 'express';
import cors from 'cors';
import { dbConnect } from './db/connection.js';
import { exit } from 'node:process';

if (!await dbConnect()) {
    console.log('Unable to connect to db.');
    exit(-1);
}
console.log('Connection to db successful!');

const app = express();
app.use(cors());
app.use(json());

app.use('/', (req, res) => res.status(404).send('No route'));

app.listen(3000, () => console.log('Listening on port 3000'));
