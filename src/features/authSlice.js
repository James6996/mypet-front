import { createSlice } from '@reduxjs/toolkit';
import { checkSessions, login, logout, register } from '../api/auth';
import { addPet, viewPet, deletePet } from '../api/pet';
import {
  turnIntoCaretaker,
  turnIntoBasicUser,
  updateLocations,
  addService,
  removeService,
  viewMyBookings,
  cancelBookings,
} from '../api/caretakers';
// import { addProfileImg } from '../api/profile';

export const nameSpace = 'auth';

export const authSlice = createSlice({
  name: nameSpace,
  initialState: {
    isAuthenticated: false,
    user: null,
    pets: [],
    services: [],
    bookings: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    addedPet: (state, action) => {
      state.user.pets = [...state.user.pets, action.payload];
      state.pets = [...state.pets, action.payload];
    },
    pushPets: (state, action) => {
      state.pets = action.payload;
    },
    delPet: (state, action) => {
      state.user.pets = state.user.pets.filter(
        (pet) => pet._id !== action.payload
      );
      state.pets = state.pets.filter((pet) => pet._id !== action.payload);
    },
    turnCaretaker: (state, action) => {
      state.user.role = action.payload.role;
    },
    turnBasicUser: (state, action) => {
      state.user.role = action.payload.role;
    },
    pushLocation: (state, action) => {
      state.user.location.coordinates = [action.payload];
    },
    pushServices: (state, action) => {
      state.services = [...state.services, action.payload];
      state.user.services = [...state.user.services, action.payload];
    },
    removeTheService: (state, action) => {
      state.services = action.payload;
      state.user.services = action.payload;
    },
    // pushPicture: (state, action) => {
    //   state.user.picture = action.payload;
    // },
    pushBookings: (state, action) => {
      state.bookings = action.payload;
    },
    removeBookings: (state, action) => {
      state.bookings = [];
    },
  },
});

// Actions
export const {
  loginSuccess,
  logoutSuccess,
  addedPet,
  pushPets,
  delPet,
  turnCaretaker,
  turnBasicUser,
  pushLocation,
  pushServices,
  removeTheService,
  // pushPicture,
  pushBookings,
  removeBookings,
} = authSlice.actions;

//Thunks
export const checkSession = () => async (dispatch) => {
  checkSessions()
    .then((user) => {
      dispatch(loginSuccess(user));
    })
    .catch((error) => console.log(error.message));
};

export const loginUser = (body) => async (dispatch) => {
  login(body)
    .then((user) => {
      dispatch(loginSuccess(user));
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logoutUser = () => async (dispatch) => {
  logout()
    .then(() => {
      dispatch(logoutSuccess());
    })
    .catch((error) => console.log(error.message));
};

export const registerUser = (body) => async (dispatch) => {
  register(body)
    .then((user) => {
      dispatch(loginSuccess(user));
    })
    .catch((error) => console.log(error.message));
};

export const addNewPet = (body) => async (dispatch) => {
  addPet(body)
    .then((data) => {
      console.log(data);
      dispatch(addedPet(data.pet));
    })
    .catch((err) => console.log(err.message));
};

export const viewMyPets = () => async (dispatch) => {
  viewPet()
    .then((pets) => {
      dispatch(pushPets(pets.allPets));
    })
    .catch((error) => console.log(error.message));
};

export const deleteAPet = (id) => async (dispatch) => {
  deletePet(id).then((pet) => {
    dispatch(delPet(pet._id));
  });
};

export const becomeCaretaker = () => async (dispatch) => {
  turnIntoCaretaker()
    .then((user) => {
      dispatch(turnCaretaker(user));
    })
    .catch((err) => console.log(err.message));
};

export const becomeBasicUser = () => async (dispatch) => {
  turnIntoBasicUser()
    .then((user) => {
      dispatch(turnBasicUser(user));
    })
    .catch((err) => console.log(err.message));
};

export const updateLocation = (long, lat) => async (dispatch) => {
  updateLocations(long, lat)
    .then((location) => {
      dispatch(pushLocation(location.newLocation.location.coordinates));
    })
    .catch((err) => console.log(err.message));
};

export const updateServices = (service) => async (dispatch) => {
  addService(service)
    .then((service) => {
      dispatch(pushServices(service.services[service.services.length - 1]));
    })
    .catch((err) => console.log(err.message));
};

export const removeOneService = (service) => async (dispatch) => {
  removeService(service)
    .then((service) => {
      dispatch(removeTheService(service.services));
    })
    .catch((err) => console.log(err.message));
};

// export const updateProfilePicture = (id, picture) => async (dispatch) => {
//   addProfileImg(id, picture)
//     .then((user) => {
//       dispatch(pushPicture(user.picture));
//     })
//     .catch((err) => console.log(err.message));
// };

export const checkBookings = () => async (dispatch) => {
  viewMyBookings()
    .then((booker) => {
      dispatch(pushBookings(booker));
    })
    .catch((err) => console.log(err.message));
};

export const cancelMyBookings = () => async (dispatch) => {
  cancelBookings()
    .then((booker) => {
      dispatch(removeBookings(booker));
    })
    .catch((err) => console.log(err.message));
};

// Selectors
export const selectIsAuhenticated = (state) => state[nameSpace].isAuthenticated;
export const selectUser = (state) => state[nameSpace].user;
export const selectPets = (state) => state[nameSpace].pets;
export const selectServices = (state) => state[nameSpace].services;
export const selectBookings = (state) => state[nameSpace].bookings;

export default authSlice.reducer;
