import React, { useState } from "react";
import { flashcardsList } from "../helper/flashcardsList";
import Legend from "./Legend";

const Card = () => {
  const [frontSide, setFrontSide] = useState(true);
  const [arrayIndex, setArrayIndex] = useState(0);

  const handleFlip = () => {
    setFrontSide(!frontSide);
  };

  const handleNextRandom = () => {
    let randomIndex = Math.floor(
      Math.random() * (flashcardsList.length - 1) + 1,
    ); // prevents index 0 from being displayed since its the intro card
    setArrayIndex(randomIndex);
    setFrontSide(true);
  };

  const shonen = flashcardsList[arrayIndex].type === "shonen";
  const shojo = flashcardsList[arrayIndex].type === "shojo";
  const seinen = flashcardsList[arrayIndex].type === "seinen";
  const josei = flashcardsList[arrayIndex].type === "josei";

  return (
    <>
      {/*Card*/}
      <div className="row">
        <div className="col">
          <div
            className={`card ${
              shonen
                ? "bg-primary"
                : shojo
                ? "bg-success"
                : seinen
                ? "bg-warning"
                : josei
                ? "bg-danger"
                : ""
            } ${frontSide ? "" : "flip"}`}
            onClick={handleFlip}
          >
            {frontSide ? (
              <div
                className="card-body"
                title={flashcardsList[arrayIndex].front}
              >
                {flashcardsList[arrayIndex].front}
              </div>
            ) : (
              <div
                className="card-body back"
                title={flashcardsList[arrayIndex].back}
              >
                {flashcardsList[arrayIndex].back}
                <img
                  className="images"
                  src={flashcardsList[arrayIndex].image}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/*Next random card button*/}
      <div className="row mt-2 mb-5">
        <div className="col d-flex justify-content-center">
          <button
            className="btn"
            type="submit"
            onClick={handleNextRandom}
            title="Next"
          >
            ⏭️
          </button>
        </div>
      </div>

      <Legend />
    </>
  );
};

export default Card;
