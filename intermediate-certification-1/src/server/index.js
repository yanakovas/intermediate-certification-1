const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const users = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/registration', async (req, res) => {
  const { email, password } = req.body.values;

  const currentUserFromDB = users.find((user) => user.email === email);

  if (currentUserFromDB) {
    res.send(
      JSON.stringify({
        message: 'Извините, пользователь с такими данными зарегистрирован',
        success: false,
      })
    );
  } else {
    users.push({ email, password });
    res.send(
      JSON.stringify({ message: 'Регистрация прошла успешно', success: true })
    );
  }
});

app.post('/login', async (req, res) => {
  const { email } = req.body.values;

  const currentUserFromDB = users.find((user) => user.email === email);

  if (currentUserFromDB) {
    res.send(
      JSON.stringify({ message: 'Авторизация прошла успешно', success: true })
    );
  } else {
    res.send(
      JSON.stringify({
        message: 'Извините, вы ввели некорректные данные',
        success: false,
      })
    );
  }
});

app.listen(9500, () => {
  console.log('server running');
});
