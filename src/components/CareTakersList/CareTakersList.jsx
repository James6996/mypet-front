import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { toast } from 'react-toastify';

import { selectIsAuhenticated } from '../../features/authSlice';
import { bookCaretaker } from '../../features/caretakersSlice';

import './CareTakersList.scss';
export default function CareTakersList(props) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuhenticated);

  const { caretakers } = props;

  async function handleBookCaretaker(id) {
    await dispatch(bookCaretaker(id));

    toast.success('Has reservado un caretaker!', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <div className="Caretakers">
        {caretakers.length ? (
          caretakers.map(
            ({ _id, picture, username, services, rating, booked }) =>
              !booked ? (
                <div className="Caretaker-card" key={_id}>
                  <div className="Caretaker-image">
                    <img
                      className="Caretaker-image__img"
                      src={
                        picture ||
                        'https://image.flaticon.com/icons/svg/2948/2948218.svg'
                      }
                      alt="Fotografía del caretaker"
                      style={{ margin: '0 auto' }}
                    />
                  </div>
                  <div className="Caretaker-text">
                    <h3 className="Caretaker-name">{username}</h3>
                    <div className="Caretaker-list">
                      {services.length ? (
                        <>
                          {services.map((service) => {
                            return (
                              <p className="Caretaker-list__service">
                                {service}
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <br />
                          <br />
                          <br />
                        </>
                      )}
                      {rating.map((ratingItem) => {
                        return (
                          <p className="Caretaker-list__rating">{ratingItem}</p>
                        );
                      })}
                    </div>
                    <div>
                      {isAuthenticated ? (
                        <button
                          className="Caretaker-button"
                          onClick={() => handleBookCaretaker(_id)}
                        >
                          Book{' '}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null
          )
        ) : (
          <Loader
            type="Rings"
            color="#00BFFF"
            height={100}
            width={100}
            //    timeout={4000}
          />
        )}
      </div>
    </div>
  );
}
