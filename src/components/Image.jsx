import React from "react";

export default function Image(props) {
  return <img className={props.class} src={props.source} alt={props.alt} />;
}
