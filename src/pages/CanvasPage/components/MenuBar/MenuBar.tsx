import React, { useState, useEffect, useRef, FC } from "react";
import "./MenuBarStyles.css";

export const MenuBar: FC = () => {
  return (
    <>
      <div className="menubar">
        <div className="leftSide">
        <button>Start</button>
        <button>Pause</button>
        <button>Reset</button>
        </div>
        <div className="rightSide">
          <button>Red</button>
          <button>Blue</button>
          <button>Green</button>
        </div>
      </div>
    </>
  );
};
