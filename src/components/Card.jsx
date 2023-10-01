import React, { useState } from "react";
import { flashcardsList } from "../helper/flashcardsList";
import Legend from "./Legend";
import Heading from "../components/Heading";

const Card = ({currrentStreak,longestStreak}) => {
  const [frontSide, setFrontSide] = useState(true);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [input,setInput] = useState("");
  const [currStreak,setCurrStreak] = useState(0);
  const [longStreak,setLongStreak] = useState(0);
  const [streakHistory,setStreakHistory] = useState([]);


  const handleFlip = () => {
    setFrontSide(!frontSide);
  };

  const handleCheck = (e) =>{
    e.preventDefault();
    const hasMatch = flashcardsList[arrayIndex].back.toLowerCase().includes(input.toLowerCase());
    if(frontSide){
      if(hasMatch && input.length > 1){
        setCurrStreak(currStreak + 1)
      }else{
        setCurrStreak(0);
        if(currStreak > longStreak){
          setLongStreak(currStreak);
          
        }
      }
    }

  }

  const handleButtons = (action) => {
    
    if(action === "shuffle"){
      let randomIndex = Math.floor(
        Math.random() * (flashcardsList.length - 1) + 1,
      ); // prevents index 0 from being displayed since its the intro card
      setArrayIndex(randomIndex);
      setFrontSide(true);
    }
    if(action === "next"){
      const newIndex = arrayIndex + 1;
      if(newIndex < flashcardsList.length){
        setArrayIndex(newIndex);
        setFrontSide(true);
      }
      
    }
    if(action === "back"){
      const newIndex = arrayIndex - 1;
      if(newIndex >= 0){
        setArrayIndex(newIndex);
        setFrontSide(true);
      }
     
    }
    
  };

  const shonen = flashcardsList[arrayIndex].type === "shonen";
  const shojo = flashcardsList[arrayIndex].type === "shojo";
  const seinen = flashcardsList[arrayIndex].type === "seinen";
  const josei = flashcardsList[arrayIndex].type === "josei";

  return (
    <>
    <Heading currentStreak={currStreak} longestStreak={longStreak}/>
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

      {/*Guess input*/}
      <div className="row mx-auto mt-3 inputRow">
        <div className="col">
          <h5 style={{color:"white"}}>Guess your answer: </h5>
        </div>
        <div className="col">
        <input 
        type="text" 
        onChange={(e)=>setInput(e.target.value)}
        value={input}
        placeholder="Enter your answer" 
        style={{textAlign:"center"}}

        />
        </div>
        <div className="col">
          <button 
          style={{borderRadius:"5px"}} 
          title="Check"
          onClick={handleCheck}
          >
            ✅
          </button>
        </div>
      </div>
      

      {/*Buttons*/}
      <div className="row emojiBtns mb-5 mx-auto" style={{width:"fit-content"}}>
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
    </>
  );
};

export default Card;
