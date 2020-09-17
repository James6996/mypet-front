import { createSlice } from '@reduxjs/toolkit';
import { getAllBlog } from '../api/blog';

export const nameSpace = 'blog';


export const blogSlice = createSlice({
    name: nameSpace,
    initialState: {
      blog: [],
    },
    reducers: {
      pushBlog: (state, action) => {
        state.blog = action.payload;
      },
    },
  });
  
  // Actions
  export const { pushBlog } = blogSlice.actions;
  
  // Thunks
  export const loadAllBlog = () => async (dispatch) => {
    getAllBlog()
      .then((blog) => {
        // console.log(blog);
        dispatch(pushBlog(blog));
      })
      .catch((err) => console.log(err.message));
  };
  
  // Selectors
  export const selectBlog = (state) => state[nameSpace].blog;
  
  export default blogSlice.reducer;
