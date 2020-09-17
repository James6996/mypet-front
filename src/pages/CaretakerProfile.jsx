import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Toggle from 'react-toggle';

import {
  selectUser,
  selectIsAuhenticated,
  becomeCaretaker,
  becomeBasicUser,
  checkSession,
  updateLocation,
  updateServices,
  removeOneService,
  checkBookings,
  selectBookings,
  cancelMyBookings,
} from '../features/authSlice';

import 'react-toggle/style.css';

import './styles/CartakerProfileStyle.scss';
import './styles/Profile.Style.scss';

export default function CaretakerProfile() {
  const [position, setPosition] = useState({ long: null, lat: null });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuhenticated);
  const bookings = useSelector(selectBookings);
  const [isCaretaker, setIsCaretaker] = useState(false);
  const [isLocationUpdated, setIsLocationUpdated] = useState(false);
  const [isViewingBookings, setIsViewingBookings] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setPosition({
          long: coords.longitude,
          lat: coords.latitude,
        });
      });
    });
  }, []);

  useEffect(() => {
    dispatch(checkSession());
    // eslint-disable-next-line
  }, [isCaretaker]);

  useEffect(() => {
    dispatch(checkSession());
    // eslint-disable-next-line
  }, [bookings]);

  if (isAuthenticated && user.role === 'basic') {
    return (
      <div>
        <img
          className="Profile-cover"
          src="/images/no-caretakers.png"
          alt="Perro cubierto con una manta"
        />

        <h1 className="No-caretaker-h1">Aún no eres caretaker</h1>

        <h2>Conviertete en uno, es muy simple!</h2>
        <p>
          Tan solo activando este botón, ya serás uno de nuestros caretakers.
        </p>
        <Toggle
          defaultChecked={isCaretaker}
          aria-label="No label tag"
          onChange={() => {
            // console.log();
            dispatch(becomeCaretaker());
            setIsCaretaker(true);
            toast.success('Felicidades, ya eres uno de nuestros caretakers!', {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }}
        />

        <p className="No-caretaker-p">
          Luego de convertirte en miembro de nuestro equipo, deberás decirnos
          qué servicios quieres aportar a nuestra comunidad. Puedes ser
          paseador, cuidador o hasta entrenador de perros y, ¿por qué no?
          ofrecer todos los servicios!
        </p>

        <h1 className="No-caretaker-h1">Servicios Caretaker</h1>
        <div className="No-caretaker-columns">
          <div className="No-caretaker-column__column">
            <h2 className="No-caretaker-columns__column-h2">Cuidadores</h2>
            <p className="No-caretaker-columns__column-p">
              Cuando dejamos a nuestr@as mascotas con alguien, queremos y
              necesitamos que estén de la mano de personas como nosotros, que
              estén pendientes de cualquier necesidad de nuestros mejores
              amigo@s !Confía en nuestro Caretakers!
            </p>
          </div>
          <div className="No-caretaker-column__column">
            <h2 className="No-caretaker-columns__column-h2">Paseadores</h2>
            <p className="No-caretaker-columns__column-p">
              Los paseadores son mucho más que alguien que "saca" a tu mascota,
              han de tener un vínculo especial y ser amantes incondicionales de
              los animales. Confía en nuestro Caretakers para ello, adelante es
              el momento!
            </p>
          </div>
          <div className="No-caretaker-column__column">
            <h2 className="No-caretaker-columns__column-h2">Adiestradores</h2>
            <p className="No-caretaker-columns__column-p">
              El adiestramiento canino es el proceso mediante el cual una
              persona logra que un perro aprenda y adquiera destreza en algo, y
              mantenga esa destreza. Confía en nuestro Caretakers para ello,
              adelante es el momento!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <img
        className="Profile-cover"
        src="/images/no-caretakers.png"
        alt="Perro cubierto con una manta"
      />
      <h1 className="No-caretaker-h1">Zona de Caretaker</h1>
      <div>
        {isAuthenticated &&
        user.location.coordinates[0] === 0 &&
        isLocationUpdated === false ? (
          <>
            <div
              className="No-caretaker-block1"
              style={{ alignItems: 'center', justifyContent: 'space-around' }}
            >
              <h3 className="No-caretaker-h3">
                Si eres un nuevo cuidador, por favor, actualiza tu ubicación{' '}
              </h3>
              <p style={{ marginLeft: '1rem' }}>
                <button
                  type="button"
                  className="Profile-button"
                  onClick={() => {
                    const { long, lat } = position;
                    dispatch(updateLocation(long, lat));
                    setIsLocationUpdated(true);
                    toast.success('Muchas gracias, ubicación actualizada', {
                      position: 'top-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                    });
                  }}
                >
                  Actualizar mi ubucación
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <p>Tu ubicación está actualizada </p>
            <p>
              <button
                type="button"
                className="Profile-button"
                onClick={() => {
                  const { long, lat } = position;

                  dispatch(updateLocation(lat, long));
                  setIsLocationUpdated(false);
                  toast.success('Ubicación Actualizada!!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                Volver a Actualizar
              </button>
            </p>
          </>
        )}

        {isAuthenticated ? (
          <>
            <div className="No-caretaker-columns">
              <div className="No-caretaker-columns__column">
                <h2 className="No-caretaker-columns__column-h2">
                  Tus servicios
                </h2>
                <p className="No-caretaker-toggle">
                  <span>Walker &nbsp;</span>
                  <Toggle
                    defaultChecked={
                      user.services.includes('walker') ? true : false
                    }
                    aria-label="No label tag"
                    onChange={() => {
                      if (user.services.includes('walker')) {
                        dispatch(
                          removeOneService({ serviceToRemove: 'walker' })
                        );

                        toast.info('Servicio removido correctamente', {
                          position: 'top-right',
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });
                      } else if (!user.services.includes('walker')) {
                        dispatch(updateServices({ newService: 'walker' }));

                        toast.info('Has dado de alta un nuevo servicio', {
                          position: 'top-right',
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });
                      }
                    }}
                  />
                </p>
                <p className="No-caretaker-toggle">
                  <span>Sitter &nbsp;</span>
                  <Toggle
                    defaultChecked={
                      user.services.includes('sitter') ? true : false
                    }
                    aria-label="No label tag"
                    onChange={() => {
                      if (user.services.includes('sitter')) {
                        dispatch(
                          removeOneService({ serviceToRemove: 'sitter' })
                        );
                        toast.info('Servicio removido correctamente', {
                          position: 'top-right',
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });

                        //  console.log('aqui debo quitarlo', serviceArr);
                      } else if (!user.services.includes('sitter')) {
                        dispatch(updateServices({ newService: 'sitter' }));
                        toast.info('Has dado de alta un nuevo servicio', {
                          position: 'top-right',
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });
                      }
                    }}
                  />
                </p>
                <p className="No-caretaker-toggle">
                  <span>Trainer &nbsp; </span>
                  <Toggle
                    defaultChecked={
                      user.services.includes('trainer') ? true : false
                    }
                    aria-label="No label tag"
                    onChange={() => {
                      if (user.services.includes('trainer')) {
                        dispatch(
                          removeOneService({ serviceToRemove: 'trainer' })
                        );
                        toast.info('Servicio removido correctamente', {
                          position: 'top-right',
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });

                        // console.log('aqui debo quitarlo', serviceArr);
                      } else if (!user.services.includes('trainer')) {
                        dispatch(updateServices({ newService: 'trainer' }));

                        toast.info('Has dado de alta un nuevo servicio', {
                          position: 'top-right',
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                        });
                      }
                    }}
                  />
                </p>
              </div>
              <div className="No-caretaker-columns__column">
                <h2 className="No-caretaker-columns__column-h2">
                  Tus reservas
                </h2>

                {user.booked === false ? (
                  <h3 className="No-caretaker-h3">
                    Aun no tienes ninguna reserva
                  </h3>
                ) : (
                  <>
                    {isViewingBookings === false ? (
                      <>
                        <button
                          className="Profile-button"
                          type="button"
                          onClick={() => {
                            setIsViewingBookings(true);
                            dispatch(checkBookings());
                          }}
                        >
                          Ver mis reservas
                        </button>
                      </>
                    ) : (
                      <>
                        <h3>¡{bookings.username} te ha reservado!</h3>

                        <p>
                          Contactale a {bookings.email} y ayuda a su mascota!!
                        </p>
                        <button
                          type="button"
                          className="Profile-button"
                          onClick={() => {
                            setIsViewingBookings(false);
                            dispatch(cancelMyBookings());

                            toast.info(
                              `Has cancelado la reserva de ${bookings.username}`,
                              {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: false,
                                progress: undefined,
                              }
                            );
                          }}
                        >
                          Cancelar esta reserva
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="No-caretaker-block2">
        <p className="No-caretaker-p">
          Quiero dejar de ser miembro caretaker: &nbsp;{' '}
        </p>
        <p>
          <Toggle
            defaultChecked={true}
            aria-label="No label tag"
            onChange={() => {
              console.log('cambiando estado a basic');
              setIsCaretaker(false);
              dispatch(becomeBasicUser());

              toast.success('Operacion realizada con exito', {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }}
          />{' '}
        </p>
      </div>
    </div>
  );
}
