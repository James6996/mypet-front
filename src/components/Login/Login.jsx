import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsAuhenticated,
  loginUser,
  checkSession,
  registerUser,
  // selectError,
} from '../../features/authSlice';

import './Login.scss';

export default function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuhenticated);
  // const error = useSelector(selectError);
  const [prevUser, setPrevUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(checkSession()).finally(setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    checkSession();
  }, [form]);

  function handleAuthUser(e) {
    e.preventDefault();
    validate(form);

    if (isLogin && prevUser) {
      dispatch(loginUser(form));
    }
    dispatch(registerUser(form));

    console.log(prevUser, error);
    return error;
  }
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function validate(values) {
    if (!values.username && prevUser === false) {
      setError({ username: 'Required username' });
    } else if (values.username === 'admin' && prevUser === false) {
      setError({ username: 'Forbidden username' });
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      setError({ email: 'invalid email' });
    }

    return error;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isAuthenticated) {
    return <Redirect to={'/profile'} />;
  }
  const { username, email, password } = form;

  return (
    <>
      <div className='Login-box'>
        {/* <h1>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>

      <button
        style={{ display: 'block', margin: '0 auto' }}
        type="button"
        onClick={() => setIsLogin(!isLogin)}
      >
        Change mode
      </button> */}
        <img
          className='Profile-cover'
          src='/images/profile-mypet.png'
          alt='Perro cubierto con una manta'
        />

        <h3 className=''>
          {!isLogin ? (
            <>
              <h3 className='Login-h3'>¿Eres miembro?</h3>
              <button
                className='Login-button'
                type='button'
                onClick={() => {
                  setPrevUser(true);
                  setIsLogin(!isLogin);
                }}
              >
                Iniciar sesión
              </button>
            </>
          ) : (
            <>
              <h3 className='Login-h3'>¿Aún no te has registrado?</h3>
              <button
                className='Login-button'
                type='button'
                onClick={() => {
                  setIsLogin(!isLogin);
                  setPrevUser(false);
                }}
              >
                Hazlo aquí
              </button>
            </>
          )}
        </h3>

        <form className='Login-form' onSubmit={handleAuthUser}>
          {isLogin ? null : (
            <div>
              <label className='Login-form__label' htmlFor='username'>
                Nombre de Usuario
              </label>
              <input
                className='Login-form__input'
                name='username'
                type='text'
                value={username}
                onChange={handleChangeInput}
                validate={username}
              />

              {/* {validate.errors ? validate.errors.username : null} */}
            </div>
          )}
          <div>
            <label className='Login-form__label' htmlFor='email'>
              Email
            </label>
            <input
              className='Login-form__input'
              name='email'
              type='email'
              value={email}
              onChange={handleChangeInput}
              validate={email}
            />
          </div>
          {validate.errors ? validate.errors.email : null}
          <div>
            <label className='Login-form__label' htmlFor='password'>
              Contraseña
            </label>
            <input
              className='Login-form__input'
              name='password'
              type='password'
              value={password}
              onChange={handleChangeInput}
            />
          </div>

          <button
            className='Login-form-button'
            disabled={form.email.length === 0}
            style={{ display: 'block', margin: '0 auto' }}
            type='submit'
          >
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>
        {error.username !== null && prevUser === false ? (
          <p>{error.username}</p>
        ) : null}
        {error.email !== null ? <p>{error.email}</p> : null}
      </div>
    </>
  );
}
