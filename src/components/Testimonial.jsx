import React from 'react';

export default function Testimonial(props) {
  return (
    <div className="Testimonial">
      <p className="Testimonial-body">{props.body}</p>
      <div className="name-type">
        <span className="Testimonial-name">{props.name}</span>
        <span className="Testimonial-type">{props.type}</span>
      </div>
    </div>
  );
}
