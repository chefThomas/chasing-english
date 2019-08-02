import React from "react";

import clip from "../static/clip2.png";
import "../stylesheets/css/main.css";
// import icon from "../static/logo.svg";

export default function ServiceCard(props) {
  return (
    <div className="ServiceCard">
      <div className="ServiceCard-clip-container">
        <img src={clip} alt={props.alt} className="ServiceCard-clip-icon" />
        <div className="post-it">{props.noteText}</div>
        <div className="shadow-left" />
      </div>
      <h4 className="ServiceCard-sub-header">{props.subHeader}</h4>
      <div className="ServiceCard-main-content">
        <h3 className="ServiceCard-header">{props.mainHeader}</h3>
        <p className="Service-body">{props.body}</p>
      </div>
    </div>
  );
}
