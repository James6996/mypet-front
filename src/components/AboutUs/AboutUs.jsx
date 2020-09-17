import React from 'react';

import './AboutUs.scss';
export default function AboutUs() {
  return (
    <div>
      <div className="aboutus">
        <h1>¿Quiénes somos?</h1>
        <div className="aboutus__image">
          <img
            src="/images/gabriel.jpg"
            width="300px"
            height="300px"
            alt="gabriel"
            className="aboutus__image"
          />
          <a
            className="aboutus__links"
            href="https://www.linkedin.com/in/gabriel-madera-castell/"
          >
            Gabriel Madera
          </a>
        </div>
        <div className="aboutus__image">
          <img
            src="/images/jaime.jpg"
            width="300px"
            height="300px"
            alt="jaime"
            className="aboutus__image"
          />
          <a
            className="aboutus__links"
            href="https://www.linkedin.com/in/jaime-garc%C3%ADa-est%C3%A9vez-b63b191b2/"
          >
            Jaime García Estévez
          </a>
        </div>

        <div>
          <img
            src="/images/rafa.jpg"
            width="300px"
            height="300px"
            alt="jaime"
            className="aboutus__image"
          />

          <a
            className="aboutus__links"
            href="https://www.linkedin.com/in/rafaelaraujoperez/"
          >
            Rafa Araujo
          </a>
        </div>
        <div className="aboutus__description">
          <p>
            Somos tres estudiantes que acabamos de finalizar un bootcamp en
            Upgrade Hub, este es nuestro proyecto final, y con ello queremos
            poder dar a conocer gran parte de nuestros conocimientos.
          </p>
          <p>
            Ha sido un trabajo en equipo con el que hemos aprendido unos de
            otros y hemos podido poner en práctica lo aprendido estos últimos
            meses.
          </p>

          <p>
            Los tres somos personas muy proactivas y con muchas ganas de
            ponernos a trabajar lo antes posible! Esperemos que os guste nuestro
            proyecto!!
          </p>
        </div>
      </div>
    </div>
  );
}
