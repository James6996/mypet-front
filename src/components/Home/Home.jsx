import React from 'react';

import { Link } from 'react-router-dom';

import './Home.scss';

export default function Home() {
  return (
    <div className='Container-home'>
      <div className='Container-img'>
        <img
          className='Container-img__image'
          src='/images/Imagen-cover.jpg'
          alt='Imagen de un perro llevando un carrito con gatos'
        />
        <p className='Container-img__content'>
          <em>
            Más que una aplicación, somos una{' '}
            <span className='Red'>comunidad.</span>
          </em>
        </p>
      </div>

      <div className='Caretaker'>
        <h1 className='Caretaker-h1'>Servicios Caretaker</h1>
        <div className='Caretaker-columns'>
          <div className='Caretaker-column__column'>
            <h2 className='Caretaker-columns__column-h2'>Cuidadores</h2>
            <p className='Caretaker-columns__column-p'>
              Cuando dejamos a nuestr@as mascotas con alguien, queremos y
              necesitamos que estén de la mano de personas como nosotros, que
              estén pendientes de cualquier necesidad de nuestros mejores
              amigo@s !Confía en nuestro Caretakers!
            </p>
          </div>
          <div className='Caretaker-column__column'>
            <h2 className='Caretaker-columns__column-h2'>Paseadores</h2>
            <p className='Caretaker-columns__column-p'>
              Los paseadores son mucho más que alguien que "saca" a tu mascota,
              han de tener un vínculo especial y ser amantes incondicionales de
              los animales. Confía en nuestro Caretakers para ello, adelante es
              el momento!
            </p>
          </div>
          <div className='Caretaker-column__column'>
            <h2 className='Caretaker-columns__column-h2'>Adiestradores</h2>
            <p className='Caretaker-columns__column-p'>
              El adiestramiento canino es el proceso mediante el cual una
              persona logra que un perro aprenda y adquiera destreza en algo, y
              mantenga esa destreza. Confía en nuestro Caretakers para ello,
              adelante es el momento!
            </p>
          </div>
        </div>
        <div>
          <Link to='/caretakers' className='button-link'>
            <button className='Home-button'>Encuéntra a tu caretaker!</button>
          </Link>
        </div>

        <div className='Caretaker-img'>
          <img
            className='Caretaker-img__image'
            src='/images/perro-gato-descansando.jpg'
            alt='Imagen de un perro y un gato durmiendo'
          />
        </div>
      </div>

      <div className='Home-shops'>
        <div className='Home-shops__column'>
          <h1 className='Home-shops__column-h1'>Tiendas</h1>
          <p className='Home-shops__column-p'>
            Si estás buscando una tienda en Madrid para comprar todo lo
            necesario para tu mascota seguramente tengas dudas sobre cuáles son
            las mejores opciones, ya que en esta gran ciudad encontrarás muchos
            locales llenos de productos para todo tipo de animales de compañía.
            Descubrelas aquí!
          </p>
          <div>
            <Link to='/shops' className='button-link'>
              <button className='Home-button'>Encuéntra tu tienda</button>
            </Link>
          </div>
        </div>
        <div className='Home-shops__image'>
          <img
            className='Home-shops__image-img'
            src='/images/pet-shop.png'
            alt='Perro en una bolsa de compra'
          />
        </div>
      </div>
    </div>
  );
}
