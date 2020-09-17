import React from 'react';
import './Contact.scss';

export default function Contact() {
  return (
    <div className="Box">
      <div className="Contact__image">
        <img src="/images/dog-contact.png" alt="" />
      </div>

      <div className="Contact__form">
        <h2 className="H2">Contáctanos</h2>
        <form className="Form" action="">
          <label className="Form__label" form="fname">
            Nombre
          </label>
          <input
            className="Form__input"
            type="text"
            id="fname"
            name="firstname"
            placeholder="Escribe aquí..."
          />
          <label className="Form__label" form="lname">
            Apellidos
          </label>
          <input
            className="Form__input"
            type="text"
            id="lname"
            name="lastname"
            placeholder="Escribe aquí..."
          />
          <label className="Form__label" form="email">
            Email
          </label>
          <input
            className="Form__input"
            type="email"
            id="email"
            name="email"
            placeholder="Escribe aquí..."
          />
          <label className="Form__label" form="subject">
            Infórmanos o infórmate!
          </label>
          <textarea
            className="Form__textarea"
            id="subject"
            name="subject"
            placeholder="Escribe aquí..."
          />
          <input className="Form__button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
