import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from '../components/BlogList';
import { loadAllBlog, selectBlog } from '../features/blogSlice';

import '../components/BlogList/BlogList.jsx';

export default function Blog() {
  const dispatch = useDispatch();
  const blog = useSelector(selectBlog);

  useEffect(() => {
    dispatch(loadAllBlog());
  });

  return (
    <div>
      <img
        className="Blog-cover"
        src="/images/blog-mypet.png"
        alt="Cinco perros mirándote"
      />
      <h1>Blog</h1>

      <BlogList blog={blog} />
    </div>
  );
}
