import { useState, useEffect, useRef, FC } from "react";
import './TitleStyles.css'

export const Title: FC = () => {
  return (
    <div className="title">
      <p className="conwayTitle">Conway's</p>
      <p className="gameTitle">Game Of Life</p>
    </div>
  );
};
