import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Summarization from "../Pages/Summarization";
import Translation from "../Pages/Translation";
import MultilingualSA from "../Pages/MultilingualSA";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summarization" element={<Summarization />} />
      <Route path="/translation" element={<Translation />} />
      <Route path="/sentiment-analysis" element={<MultilingualSA />} />
    </Routes>
  );
};

export default MainRoute;
