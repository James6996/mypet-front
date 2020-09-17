import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import Pet from '../components/Pet';

import {
  logoutUser,
  selectUser,
  selectIsAuhenticated,
  addNewPet,
  selectPets,
  viewMyPets,
  checkSession,
  // updateProfilePicture,
} from '../features/authSlice';

import './styles/Profile.Style.scss';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const pets = useSelector(selectPets);
  const isAuthenticated = useSelector(selectIsAuhenticated);

  useEffect(() => {
    dispatch(checkSession());
    // eslint-disable-next-line
  }, [pets]);

  const [isViewingPets, setIsViewingPets] = useState(false);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [form, setForm] = useState({
    userId: '',
    name: '',
    age: '',
    type: '',
    race: '',
    gender: 'male',
    info: '',
  });

  function handleAddPet(e) {
    e.preventDefault();
    dispatch(addNewPet({ ...form, age: Number(form.age) }));
    setForm({
      userId: '',
      name: '',
      age: '',
      type: 'dog',
      race: '',
      gender: 'male',
      description: '',
    });

    toast.success('Nueva mascota agregada!', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

    setIsAddingPet(false);
  }
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      userId: user._id,
      [name]: value,
    });
  }

  function handleCancelAddPet() {
    setIsAddingPet(false);
  }

  const { name, age, type, race, gender, info } = form;

  if (isAuthenticated) {
    return (
      <div className='Auth__container'>
        <img
          className='Profile-cover'
          src='/images/profile-mypet.png'
          alt='Perro cubierto con una manta'
        />
        <div className='Profile-block'>
          {/* <img
            className='Profile-imgBack'
            src='/images/huellas.png'
            alt='Imagen de huellas de perro'
          /> */}
          <div className='Profile-front-n1'>
            <h1 className='Profile-h1'>Bienvenid@ a MyPet, {user.username}!</h1>{' '}
            <button
              className='Profile-button'
              type='button'
              onClick={() => dispatch(logoutUser())}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        {/* {!isViewingPets ? (
          <div className='Profile-front-n2'>
            <h2 className='Profile-h2'>¿Deseas ver tus mascotas?</h2>
            <button
              // style={{ marginLeft: '1rem' }}
              type='button'
              disabled={!pets}
              className='Profile-button'
              onClick={() => {
                setIsViewingPets(true);
                dispatch(viewMyPets());
              }}
            >
              Ver mis mascotas
            </button>
          </div>
        ) : (
          <>
            {pets.length ? (
              <div className='Profile-front-n2'>
                <button
                  // style={{ marginLeft: '1rem' }}
                  className='Profile-button'
                  type='button'
                  onClick={() => {
                    setIsViewingPets(false);
                  }}
                >
                  Cerrar
                </button>
              </div>
            ) : null}
          </>
        )} */}

        {!isAddingPet ? (
          <div className='Profile-front-n3'>
            <h2 className='Profile-h2'>Añade una nueva mascota </h2>
            <button
              className='Profile-button'
              type='button'
              onClick={() => {
                setIsAddingPet(true);
                setIsViewingPets(false);
              }}
            >
              Añadir nueva mascota
            </button>
          </div>
        ) : (
          <>
            <div className='Profile-front-n3'>
              <div className='Box'>
                <h2 className='Profile-h2'>Tu nueva mascota</h2>
                <div className='Contact__form'>
                  <form className='Form' onSubmit={handleAddPet}>
                    <div className=''>
                      <label className='Form__label' htmlFor='name'>
                        Nombre:{' '}
                      </label>
                      <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleChangeInput}
                        className='Form__input'
                      />
                    </div>
                    <div className=''>
                      <label className='Form__label' htmlFor='name'>
                        Edad:{' '}
                      </label>
                      <input
                        type='number'
                        name='age'
                        value={age}
                        onChange={handleChangeInput}
                        className='Form__input'
                      />
                    </div>
                    <div className=''>
                      <label className='Form__label' htmlFor='name'>
                        Tipo:{' '}
                      </label>
                      {/* <input
                      type="text"
                      name="type"
                      value={type}
                      onChange={handleChangeInput}
                      className="Form__input"
                    /> */}
                      <select
                        name='type'
                        onChange={handleChangeInput}
                        className='Form__input'
                        value={type}
                      >
                        <option value='dog'>Perro</option>
                        <option value='cat'>Gato</option>
                        <option value='other'>Otro</option>
                      </select>
                    </div>
                    <div className=''>
                      <label className='Form__label' htmlFor='name'>
                        Raza:{' '}
                      </label>
                      <input
                        type='text'
                        name='race'
                        value={race}
                        onChange={handleChangeInput}
                        className='Form__input'
                      />
                    </div>
                    <div className=''>
                      <label className='Form__label' htmlFor='name'>
                        Genero:{' '}
                      </label>
                      <select
                        name='gender'
                        onChange={handleChangeInput}
                        className='Form__input'
                        value={gender}
                      >
                        <option value='male'>Masculino</option>
                        <option value='female'>Femenino</option>
                      </select>
                    </div>
                    <div className=''>
                      <label className='Form__label' htmlFor='name'>
                        Algunas notas?:{' '}
                      </label>
                      <textarea
                        name='info'
                        value={info}
                        cols='50'
                        rows='5'
                        onChange={handleChangeInput}
                        className='Form__input'
                        placeholder=' Escribe aquí cualquier info que desees recordar sobre tu
                      mascota'
                      ></textarea>
                    </div>
                    <button type='submit' className='Profile-button'>
                      Añadir
                    </button>

                    <button
                      style={{ marginLeft: '1rem' }}
                      type='button'
                      onClick={handleCancelAddPet}
                      className='Profile-button'
                    >
                      Cancelar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}

        {!isViewingPets ? (
          <div className='Profile-front-n2'>
            <h2 className='Profile-h2'>¿Deseas ver tus mascotas?</h2>
            <button
              // style={{ marginLeft: '1rem' }}
              type='button'
              disabled={!pets}
              className='Profile-button'
              onClick={() => {
                setIsAddingPet(false);
                setIsViewingPets(true);
                dispatch(viewMyPets());
              }}
            >
              Ver mis mascotas
            </button>
          </div>
        ) : (
          <>
            {pets.length ? (
              <div className='Profile-front-n2'>
                <h1 className='Caretaker-h1'>Estas son tus mascotas:</h1>

                <button
                  // style={{ marginLeft: '1rem' }}
                  className='Profile-button'
                  type='button'
                  onClick={() => {
                    setIsViewingPets(false);
                  }}
                >
                  Cerrar
                </button>
              </div>
            ) : null}
          </>
        )}

        {isViewingPets && pets.length ? <Pet pets={pets} /> : null}
      </div>
    );
  }
  return <Redirect to={'/'} />;
}
