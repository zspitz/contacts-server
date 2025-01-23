import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

app.use('/', (req, res) => res.sendStatus(404));

app.listen(3000, () => console.log('Listening on port 3000'));
