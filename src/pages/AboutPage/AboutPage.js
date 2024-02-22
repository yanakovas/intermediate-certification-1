import React from 'react';
import s from './about_page.module.css';

export const AboutPage = () => {
  return (
    <>
      <div className={s.about}>
        <div className={s.description}>
          С помощью данного сайта можно посмотреть погоду в любом городе мира.
        </div>
        <img
          src="https://s9.travelask.ru/uploads/post/000/011/737/main_image/webp_gallery-9f4c1a2097c11e4a7e507f295ec3f8cd.webp"
          alt="город в тумане"
        />
      </div>
    </>
  );
};
