import React from "react";
import "../stylesheets/css/main.css";

export default function Grid(props) {
  return (
    <div className={`${props.class} Grid`}>
      {props.gridItems.map(item => item)}
    </div>
  );
}
