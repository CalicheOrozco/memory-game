import React from "react";

function Card({ id, name, image }) {
  return <img src={image} alt={name} key={id} className="h-24 w-24 md:h-32 md:w-32 lg:h-max lg:w-max shadow-md rounded-xl" />;
}

export default Card;
