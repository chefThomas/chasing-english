import React from "react";

export default function TextBlock(props) {
  return (
    <div className="TextBlock">
      <h3 className="TextBlock-header">{props.header}</h3>
      <p className="TextBlock-body">{props.text}</p>
    </div>
  );
}
