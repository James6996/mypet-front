import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export default function Footer() {
  return (
    <div className="Footer">
      <ul>
        <li>
          <Link to="/contact" className="Footer__item">
            <h3 className="Footer__item">Contacto</h3>
          </Link>
        </li>
        <li>
          <Link to="/aboutUs" className="Footer__item">
            <h3 className="Footer__item">Sobre nosotros</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
}
