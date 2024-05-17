import React, { useState, useEffect, useRef } from "react";
import { MenuBar } from "./components/MenuBar/MenuBar";
import GameGrid from "./components/Grid/Grid";
import { Title } from "./components/Title";

export const CanvasPage: React.FC = () => {
  
  return (
    <>
      <Title />
      <GameGrid />
      <MenuBar /> 
      
    </>
  );
};

export default CanvasPage;
