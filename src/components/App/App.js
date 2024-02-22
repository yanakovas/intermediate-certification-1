import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import { AppRoute } from '../../consts';
import { Header } from '../Header/Header';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { AboutPage } from '../../pages/AboutPage/AboutPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { WeatherPage } from '../../pages/WeatherPage/WeatherPage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={AppRoute.Registration} element={<RegistrationPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Weather} element={<WeatherPage />} />
          <Route path={AppRoute.About} element={<AboutPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
