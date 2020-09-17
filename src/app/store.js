import { configureStore } from '@reduxjs/toolkit';

import shopReducer, { nameSpace as shopNamespace } from '../features/shopSlice';
import blogReducer, { nameSpace as blogNamespace } from '../features/blogSlice';
import caretakerReducer, {
  nameSpace as caretakerNamespace,
} from '../features/caretakersSlice';
import authReducer, { nameSpace as authNamespace } from '../features/authSlice';

export default configureStore({
  reducer: {
    [shopNamespace]: shopReducer,
    [blogNamespace]: blogReducer,
    [caretakerNamespace]: caretakerReducer,
    [authNamespace]: authReducer,
  },
});
