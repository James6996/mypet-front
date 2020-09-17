import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { deleteAPet, selectPets, checkSession } from '../../features/authSlice';

import './Pet.scss';

export default function Pet(props) {
  const { pets } = props;

  const dispatch = useDispatch();
  const petArray = useSelector(selectPets);

  useEffect(() => {
    dispatch(checkSession());
    // eslint-disable-next-line
  }, [petArray]);

  // function handleDeletePet() {}

  return (
    <div>
      <div className="Shops">
        {pets.length
          ? pets.map(({ _id, name, age, race, gender, picture }) => (
              <div key={_id} className="Shop">
                <div className="Shop-image">
                  <img
                    className="Shop-image__img"
                    style={{ width: 300, height: 230 }}
                    src={
                      picture ||
                      'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
                    }
                    alt="pet"
                  />
                </div>
                <div className="Shop-text">
                  <h3 className="Shop-name">{name}</h3>
                  <div className="Shop-list">
                    <p className="Shop-list__type">Edad: </p>
                    <p className="Shop-list__type-value">{age}</p>
                    <p className="Shop-list__type">Raza:</p>
                    <p className="Shop-list__type-value"> {race}</p>
                    <p className="Shop-list__type">Genero:</p>
                    <p className="Shop-list__type-value"> {gender}</p>

                    <button
                      type="button"
                      style={{ marginBottom: '1rem' }}
                      className="Form__button"
                      onClick={() => {
                        dispatch(deleteAPet(_id));

                        toast.success('Mascota eliminada', {
                          position: 'top-right',
                          autoClose: 4000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
