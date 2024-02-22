import { users } from '../index.js';

export const login = async (req, res) => {
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
};
