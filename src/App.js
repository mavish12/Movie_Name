// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import SingleMovie from "./SingleMovie";
import Error from "./Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<SingleMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
