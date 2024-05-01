import { useState, useEffect, useRef, FC } from "react";
import greySquare from ''

interface Cell {
  x: number;
  y: number;
}

const resolution: number = 20;
const cols: number = 80;
const rows: number = 40;

const createEmptyGrid = (): number[][] => {
  const grid: number[][] = Array.from({ length: cols }, () =>
    Array(rows).fill(0)
  );
  return grid;
};

export const GameGrid: FC = () => {
  const [grid, setGrid] = useState(createEmptyGrid);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.clearRect(0, 0, cols * resolution, rows * resolution);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const color = grid[i][j] === 1 ? "white" : "black";
          context.fillStyle = color;
          context.fillRect(
            i * resolution,
            j * resolution,
            resolution - 1,
            resolution - 1
          );
        }
      }
    }
  }, [grid]);

  const updateGame = () => {
    setGrid((prev) => {
      const next = createEmptyGrid();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const state = prev[i][j];
          const neighbors = countNeighbors(prev, i, j);

          if (state === 0 && neighbors === 3) {
            next[i][j] = 1;
          } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
          } else {
            next[i][j] = state;
          }
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(updateGame, 100);
    return () => clearInterval(interval);
  }, []);

  const countNeighbors = (grid: number[][], x: number, y: number): number => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const col = (x + i + cols) % cols;
        const row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  };

  return (
    <div className="grid">
      
      <canvas 
        ref={canvasRef}
        width={cols * resolution}
        height={rows * resolution}
      />
      
    </div>
  );
};

export default GameGrid;
