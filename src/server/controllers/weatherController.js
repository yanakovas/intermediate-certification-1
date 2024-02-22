import { writeCityWeatherData } from '../models/writeCityWeaterData';

export const weatherController = async (req, res) => {
  writeCityWeatherData(req.body);
  res.end();
};
