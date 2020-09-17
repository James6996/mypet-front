import React from 'react';
import './Blog.scss';
export default function Blog(props) {
  const { blog } = props;
  return (
    <div className="blog">
      {blog.map(({ id, picture, title, description }) => (
        <div key={id} className="blog__card">
          <div>
            <img className="blog__card__image" src={picture} alt={title} />
          </div>
          <div className="blog__title">
            <h2>{title}</h2>
          </div>
          <p className="blog__description">{description}</p>
          
        </div>
      ))}
    </div>
  );
}
