import React, { useState, useEffect } from "react";
import { flashcardsList } from "../helper/flashcardsList";
import Legend from "./Legend";
import Heading from "../components/Heading";
import MasteredCards from "../components/MasteredCards";
import CompletedDeck from "./CompletedDeck";

const Card = () => {
  const [flashcardList, setFlashcardList] = useState(flashcardsList);
  const [frontSide, setFrontSide] = useState(true);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [input, setInput] = useState("");
  const [currStreak, setCurrStreak] = useState(0);
  const [longStreak, setLongStreak] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [mastered, setMastered] = useState([]);
  const [completedDeck, setCompletedDeck] = useState(false);

  const checkAllMastered = () => {
    return mastered.length === flashcardsList.length - 1;
  };

  useEffect(() => {
    // Check if all flashcards have been mastered or flashcardList is empty
    if (checkAllMastered() || flashcardList.length === 0) {
      setCompletedDeck(true);
    } else {
      setCompletedDeck(false);
    }
  });

  const handleFlip = () => {
    setFrontSide(!frontSide);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const hasMatch = flashcardList[arrayIndex].back
      .toLowerCase()
      .includes(input.toLowerCase());
    // check button only works if were on front side AND not on first card (start card)
    if (frontSide && (arrayIndex > 0)) { 
      if ((input.length > 1) && hasMatch) {
        setCurrStreak(currStreak + 1);
        setCorrect(true);
        setWrong(false);
      } else {
        setCurrStreak(0);
        setWrong(true);
        setCorrect(false);
        // only change long streak value if current streak is a bigger number
        if (currStreak > longStreak) { 
          setLongStreak(currStreak);  
        }
      }
    }
  };

  const shuffleArray = (array) => {
    if (arrayIndex > 0) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i) + 1; // prevents first card from being shuffled
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  };

  const handleButtons = (action) => {
    if (action === "shuffle") {
      shuffleArray(flashcardList);
      let randomIndex = Math.floor(
        Math.random() * (flashcardList.length - 1) + 1,
      ); // prevents index 0 from being displayed since its the intro card
      setArrayIndex(randomIndex);
      setFrontSide(true);
      setCorrect(false);
      setWrong(false);
      setInput("");
    }

    if (action === "next") {
      const newIndex = arrayIndex + 1;
      if (newIndex < flashcardList.length) {
        setArrayIndex(newIndex);
        setFrontSide(true);
        setCorrect(false);
        setWrong(false);
        setInput("");
      }
    }
    if (action === "back") {
      const newIndex = arrayIndex - 1;
      if (newIndex >= 0) {
        setArrayIndex(newIndex);
        setFrontSide(true);
        setCorrect(false);
        setWrong(false);
        setInput("");
      }
    }
  };

  const handleMastered = () => {
    if (arrayIndex >= 0 && arrayIndex < flashcardList.length) {
      const masteredItem = flashcardList[arrayIndex].back;

      setMastered([...mastered, masteredItem]);
      const updatedFlashcardList = flashcardList.filter(
        (_, index) => index !== arrayIndex,
      );

      // Check if there are any flashcards left
      if (updatedFlashcardList.length > 0) {
        // If there are more flashcards, set a new index
        const newIndex =
          arrayIndex < updatedFlashcardList.length ? arrayIndex : 0;
        setArrayIndex(newIndex);
        setFlashcardList(updatedFlashcardList);
        setFrontSide(true);
        setCorrect(false);
        setWrong(false);
        setInput("");
      }
    }
  };

  const shonen = flashcardList[arrayIndex].type === "shonen";
  const shojo = flashcardList[arrayIndex].type === "shojo";
  const seinen = flashcardList[arrayIndex].type === "seinen";
  const josei = flashcardList[arrayIndex].type === "josei";

  return (
    <>
      <Heading
        currentStreak={currStreak}
        longestStreak={longStreak}
        cardsCount={flashcardList.length - 1}
      />

      {completedDeck ? (
        <CompletedDeck />
      ) : (
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
                  title={flashcardList[arrayIndex].front}
                >
                  {flashcardList[arrayIndex].front}
                </div>
              ) : (
                <div
                  className="card-body back"
                  title={flashcardList[arrayIndex].back}
                >
                  {flashcardList[arrayIndex].back}
                  <img
                    className="images"
                    src={flashcardList[arrayIndex].image}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/*Guess input*/}
      <div className="row mx-auto mt-3 inputRow">
        <div className="col">
          <h5 style={{ color: "white" }}>Guess your answer: </h5>
        </div>
        <div className="col">
          <input
            className={`signifier ${
              correct ? "signifierCorrect" : wrong ? "signifierWrong" : ""
            }`}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Enter your answer"
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="col emojisContainer">
          <button title="Check answer" onClick={handleCheck}>
            ✅
          </button>
          <button
            title="Mastered"
            onClick={handleMastered}
            disabled={arrayIndex === 0}
          >
            💯
          </button>
        </div>
      </div>

      {/*Buttons*/}
      <div
        className="row emojiBtns mb-5 mx-auto"
        style={{ width: "fit-content" }}
      >
        {/*Back button*/}
        <div className="col">
          <button
            className="btn"
            type="submit"
            onClick={() => handleButtons("back")}
            title="Back"
          >
            ⬅️
          </button>
        </div>

        {/*Shuffle button*/}

        <div className="col">
          <button
            className="btn"
            type="submit"
            onClick={() => handleButtons("shuffle")}
            title="Shuffle"
            disabled={flashcardList.length - 1 === 0}
          >
            🔀
          </button>
        </div>

        {/*Next button*/}

        <div className="col ">
          <button
            className="btn"
            type="submit"
            onClick={() => handleButtons("next")}
            title="Next"
          >
            ➡️
          </button>
        </div>
      </div>

      <Legend />

      {/*Mastered list*/}
      <div className="row masteredList position-absolute top-0 end-0">
        <div className="col">
          <MasteredCards mastered={mastered} />
        </div>
      </div>
    </>
  );
};

export default Card;
