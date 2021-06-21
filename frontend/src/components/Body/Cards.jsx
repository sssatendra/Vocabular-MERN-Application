import React from "react";
import "./Cards.css";

function Cards({ word, meaning }) {
  return (
    <div className="list__item">
      <h2>{word}</h2>
      <p>{meaning}</p>
      <hr />
    </div>
  );
}

export default Cards;
