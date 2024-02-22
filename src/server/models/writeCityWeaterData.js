import { pool } from '../';

export const writeCityWeatherData = async (dataToWrite) => {
  const { name, country, temperature, conditions, speed } = dataToWrite;
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error('connetion error', err);
    }
    client.query(
      'INSERT INTO cities(name, country, temperature, conditions, speed) VALUES($1, $2, $3, $4, $5)',
      [name, country, Math.floor(temperature), conditions, Math.floor(speed)],
      function (err, result) {
        // call `done()` to release the client back to the pool
        done();

        if (err) {
          return console.error('error running query', err);
        }
        console.log('-->', result);
      }
    );
  });
};
