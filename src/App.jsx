import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Heading from "./components/Heading";
import Card from "./components/Card";

const App = () => {
  return (
    <>
      <Heading />
      <Card />
    </>
  );
};

export default App;
