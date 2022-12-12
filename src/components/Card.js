import React from "react";

function Card({ id, name, image }) {
  return <img src={image} alt={name} key={id} className="h-24 w-24lg:h-max lg:w-max shadow-md rounded-xl" />;
}

export default Card;
