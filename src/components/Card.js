import React from "react";

function Card({ id, name, image, flipped }) {
  return (
    <div class="relative">
    <img src={image} alt={name} key={id} className="h-24 w-24 lg:h-max lg:w-max shadow-md rounded-xl" />
    { flipped === false ? <div class="overlay hover:bg-white opacity-50 w-full h-full rounded-2xl absolute top-0 left-0 z-20"></div> : null}
    </div>
  )
}

export default Card;
