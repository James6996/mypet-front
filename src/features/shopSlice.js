import { createSlice } from '@reduxjs/toolkit';
import { getShopsByDistance } from '../api/shops';

export const nameSpace = 'shops';

export const shopsSlice = createSlice({
  name: nameSpace,
  initialState: {
    shops: [],
  },
  reducers: {
    pushShops: (state, action) => {
      state.shops = action.payload;
    },
  },
});

// Actions
export const { pushShops } = shopsSlice.actions;

// Thunks
export const loadShopsByDistance = (long, lat, distance) => async (
  dispatch
) => {
  getShopsByDistance(long, lat, distance)
    .then((data) => {
      //console.log(shops);
      dispatch(pushShops(data));
    })
    .catch((err) => console.log(err.message));
};

// Selectors
export const selectShops = (state) => state[nameSpace].shops;

export default shopsSlice.reducer;
