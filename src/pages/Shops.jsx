import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import ShopsList from '../components/ShopsList';
import { loadShopsByDistance, selectShops } from '../features/shopSlice';

import '../components/ShopsList/Shops.scss';
import '../components/CareTakersList/CareTakersList.scss';

export default function Shops() {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const [position, setPosition] = useState({ long: null, lat: null });
  const [distance, setDistance] = useState(100000000000000000);
  const [isLoading, setIsLoading] = useState(true);

  function handleChangeInput(e) {
    const { value } = e.target;
    setDistance(value);
    // console.log(distance);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPosition({
        long: coords.longitude,
        lat: coords.latitude,
      });
    });
  }, []);

  useEffect(() => {
    const { long, lat } = position;

    if (long && lat) {
      dispatch(loadShopsByDistance(long, lat, distance)).then(() => {
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
        src="/images/shops-mypet.png"
        alt="Cinco perros mirándote"
      />

      <h1 className="Shops-title">Shops</h1>

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
          <option value="1000">1 Km</option>
          <option value="2000">2 Km</option>
          <option value="3000">3 Km</option>
          <option value="5000">5 Km</option>
          <option value="100000000000000000">Todas las tiendas</option>
        </select>
      </div>

      {!shops.length ? (
        <>
          <h3>Lo sentimos, no hay tiendas tan cerca de tu ubicacion!</h3>
        </>
      ) : (
        <React.Fragment>
          <h3 className="Caretekers-select__message">
            Hay {shops.length} tiendas cerca de ti!
          </h3>
          <ShopsList shops={shops} />{' '}
        </React.Fragment>
      )}
    </div>
  );
}
