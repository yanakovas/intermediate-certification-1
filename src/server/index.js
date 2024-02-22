//! Поскольку не разобрался почему некорректно работают импорты при попытке запуска команды 'node index.js'
//! пользовался следующей командой для старта сервера: 'node --experimental-specifier-resolution=node index.js'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registration } from './controllers/registrationController';
import { login } from './controllers/loginColntroller';
import { weatherController } from './controllers/weatherController';

import pkg from 'pg';
export const pool = new pkg.Pool({
  host: 'http://localhost/',
  port: 9000,
  database: 'weather',
  user: 'postgres',
  password: 'postgres',
});

const app = express();

export const users = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/registration', registration);
app.post('/login', login);
app.post('/weather', weatherController);

app.listen(9500, () => {
  console.log('server running on port 9500');
});
