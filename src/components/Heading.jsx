import React from "react";
import { flashcardsList } from "../helper/flashcardsList";

const Heading = (props) => {
  return (
    <div className="Header">
      <h1>Guess the Anime based off a bad description</h1>
      <h4>Rules are simple, just guess the anime by a terrible description</h4>
      <h5 className="mt-4">
        Number of cards: {flashcardsList.length - 1}
      </h5>
      <h5 className="mb-2 mt-5">
        Current Streak: {props.currentStreak}, Longest Streak: {props.longestStreak}
      </h5>
    </div>
  );
};

export default Heading;
