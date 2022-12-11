import React from "react";

function Card({ id, name, image }) {
  return <img src={image} alt={name} key={id} />;
}

export default Card;
