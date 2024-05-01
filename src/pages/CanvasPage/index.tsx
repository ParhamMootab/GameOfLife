import React, { useState, useEffect, useRef } from "react";
import { MenuBar } from "./components/MenuBar";
import GameGrid from "./components/Grid";

export const CanvasPage: React.FC = () => {
  
  return (
    <>
      <GameGrid />
      <MenuBar /> 
      
    </>
  );
};

export default CanvasPage;
