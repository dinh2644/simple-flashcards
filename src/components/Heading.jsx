import React from "react";
import { flashcardsList } from "../helper/flashcardsList";

const Heading = () => {
  return (
    <div className="Header">
      <h1>Guess the Anime based off a bad description</h1>
      <h4>Rules are simple, just guess the anime by a terrible description</h4>
      <h5 className="mt-4 mb-5">
        Number of cards: {flashcardsList.length - 1}
      </h5>
    </div>
  );
};

export default Heading;
