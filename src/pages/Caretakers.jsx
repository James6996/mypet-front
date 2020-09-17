import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import CareTakersList from '../components/CareTakersList';

import {
  loadAllCaretakers,
  selectCareTakers,
} from '../features/caretakersSlice';
import { useDispatch, useSelector } from 'react-redux';

import '../components/CareTakersList/CareTakersList.scss';

export default function Caretakers() {
  const [position, setPosition] = useState({ long: null, lat: null });
  const [distance, setDistance] = useState(100000000000000000);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const caretakers = useSelector(selectCareTakers);

  function handleChangeInput(e) {
    const { value } = e.target;
    setDistance(value);
    // console.log(distance);
  }

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
    const { long, lat } = position;

    if (long && lat) {
      dispatch(loadAllCaretakers(long, lat, distance)).then(() => {
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [position, distance]);

  if (isLoading) {
    return <Loader type="Rings" color="#00BFFF" height={100} width={100} />;
  }

  return (
    <div>
      <img
        className="Caretekers-cover"
        src="/images/caretaker-mypet.png"
        alt="tres perros de la misma raza llevados con correa"
      />
      <h1 className="Caretekers-title">Caretakers</h1>

      <div className="Caretekers-select">
        <label className="Caretekers-select__name" htmlFor="name">
          <p>Filtrar por distancia:</p>
        </label>
        <select
          className="Caretekers-select__select"
          name="gender"
          onChange={handleChangeInput}
          value={distance}
        >
          <option className="Caretekers-select__option" value="1000">
            1 Km
          </option>
          <option className="Caretekers-select__option" value="2000">
            2 Km
          </option>
          <option className="Caretekers-select__option" value="3000">
            3 Km
          </option>
          <option className="Caretekers-select__option" value="5000">
            5 Km
          </option>
          <option className="Caretekers-select__option" value="8000">
            8 Km
          </option>
          <option className="Caretekers-select__option" value="10000">
            10 Km
          </option>
          <option className="Caretekers-select__option" value="15000">
            15 Km
          </option>
          <option
            className="Caretekers-select__option"
            value="100000000000000000"
          >
            Todos los Caretekers
          </option>
        </select>
      </div>

      {!caretakers.length ? (
        <>
          <h3 className="Caretekers-select__message">
            Lo sentimos, no hay cuidadores cerca de ti.
            {/* Unfortunately, there are no caretakers that close to you. */}
          </h3>
        </>
      ) : (
        <h3 className="Caretekers-select__message">
          ¡Hay {caretakers.length} cuidadores cerca de ti!
        </h3>
      )}

      <CareTakersList caretakers={caretakers} />
    </div>
  );
}
