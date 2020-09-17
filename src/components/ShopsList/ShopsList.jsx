import React from 'react';

import './Shops.scss';

export default function ShopsList(props) {
  const { shops } = props;

  return (
    <div>
      <div className="Shops">
        {shops.map(({ id, picture, category, name, contact, rating }) => (
          <div className="Shop" key={id}>
            <div className="Shop-image">
              <img
                className="Shop-image__img"
                src={picture}
                alt="Fotografía del cuidador"
              />
            </div>
            <div className="Shop-text">
              <h3 className="Shop-name">{name}</h3>
              <div className="Shop-list">
                <p className="Shop-list__type">categoria </p>
                <p className="Shop-list__type-value">{category}</p>
                <p className="Shop-list__type">contacto</p>
                <p className="Shop-list__type-value">{contact}</p>
                {rating.lenght ? (
                  <>
                    <p className="Shop-list__type">rating</p>
                    <p>{rating} </p>
                  </>
                ) : (
                  <>
                    <p className="Shop-list__type">rating</p>
                    <p className="Shop-list__type-rating">
                      {' '}
                      Aún no tiene suficientes reseñas
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
