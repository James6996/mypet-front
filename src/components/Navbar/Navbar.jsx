import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { selectIsAuhenticated } from '../../features/authSlice';

import './Navbar.scss';

export default function Navbar() {
  const isAuthenticated = useSelector(selectIsAuhenticated);

  return (
    <nav>
      <img src="/images/logo.png" alt="Logo My Pet" />

      <button id="check">
        <label for="check">
          <span id="btn-check">&#9776;</span>
          <span id="btn-cancel">&#9747;</span>
        </label>
      </button>

      <ul>
        <li>
          <Link to="/" className="Link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/caretakers" className="Link">
            Caretakers
          </Link>
        </li>
        <li>
          <Link to="/shops" className="Link">
            Tiendas
          </Link>
        </li>
        <li>
          <Link to="/blog" className="Link">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/contact" className="Link">
            Contacto
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link to="/profile/caretaker" className="Link">
              Área Caretaker
            </Link>
          </li>
        ) : null}
        <li>
          <Link to="/login" className="Link">
            {isAuthenticated ? 'Perfil' : 'Login'}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
