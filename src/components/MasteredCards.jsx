import React from "react";
import { flashcardsList } from "../helper/flashcardsList";

const MasteredCards = ({ mastered }) => {
  return (
    <>
      <h2>💯 Mastered:</h2>
      <ul>
        {mastered.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default MasteredCards;
