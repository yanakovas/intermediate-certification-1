import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

export const Header = () => {
  return (
    <header className="header">
      <h1>Intermediate certification №2</h1>
      <div className="menu">
        <Link to={AppRoute.Registration}>Регистрация</Link>
        <Link to={AppRoute.Login}>Вход</Link>
        <Link to={AppRoute.Weather}>Информация о городе</Link>
        <Link to={AppRoute.About}>О сервисе</Link>
      </div>
    </header>
  );
};
