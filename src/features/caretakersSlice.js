import { createSlice } from '@reduxjs/toolkit';
import { getCaretakers, bookCaretakers } from '../api/caretakers';

export const nameSpace = 'caretakers';

export const caretakersSlice = createSlice({
  name: nameSpace,
  initialState: {
    caretakers: [],
    isLoading: false,
    distanceFilter: null,
    serviceFilter: null,
  },
  reducers: {
    pushCaretakers: (state, action) => {
      state.caretakers = action.payload;
    },
    bookingCaretaker: (state, action) => {
      state.isBooked = true;
    },

    updateCaretaker: (state, action) => {
      const caretaker = action.payload;

      state.caretakers = state.caretakers.map((el) => {
        if (el._id === caretaker._id) {
          return caretaker;
        }

        return el;
      });
    },
  },
});

// Actions
export const {
  pushCaretakers,
  bookingCaretaker,
  updateCaretaker,
  cancelCaretaker,
} = caretakersSlice.actions;

// Thunks
export const loadAllCaretakers = (long, lat, distance) => async (dispatch) => {
  getCaretakers(long, lat, distance)
    .then(({ caretakers }) => {
      dispatch(pushCaretakers(caretakers));
    })
    .catch((err) => console.log(err.message));
};

export const bookCaretaker = (caretakerId) => async (dispatch) => {
  bookCaretakers(caretakerId)
    .then((caretaker) => {
      dispatch(updateCaretaker(caretaker));
    })
    .catch((err) => console.log(err.message));
};

// Selectors
export const selectCareTakers = (state) => state[nameSpace].caretakers;
export const selectIsLoading = (state) => state[nameSpace].caretakers;
export const selectDistanceFilter = (state) => state[nameSpace].caretakers;
export const selectServiceFilter = (state) => state[nameSpace].caretakers;

export default caretakersSlice.reducer;
