import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef, FC } from "react";

interface Cell {
  x: number;
  y: number;
}

const resolution: number = 18;
const cols: number = 40;
const rows: number = 80;

const createEmptyGrid = (): number[][] => {
  const grid: number[][] = Array.from({ length: cols }, () =>
    Array(rows).fill(0)
  );
  return grid;
};

export const GameGrid: FC = () => {
  const [grid, setGrid] = useState(createEmptyGrid);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   const context = canvasRef.current?.getContext("2d");
  //   if (context) {
  //     context.clearRect(0, 0, cols * resolution, rows * resolution);
  //     let image = new Image();
  //     image.src = `${process.env.PUBLIC_URL}/assets/greySquare.png`;
  //     image.onload = () => {
  //       for (let i = 0; i < cols; i++) {
  //         for (let j = 0; j < rows; j++) {
  //           const color = grid[i][j] === 1 ? "white" : "black";

  //           context.drawImage(
  //             image,
  //             i * resolution,
  //             j * resolution,
  //             resolution,
  //             resolution
  //           );
  //         }
  //       }
  //     };
  //   }
  // }, [grid]);

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
    // const interval = setInterval(updateGame, 100);
    // return () => clearInterval(interval);
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

  function cellClicked(rowIndex: number, colIndex: number): void {
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);
      if (newGrid[rowIndex][colIndex] === 0) {
        newGrid[rowIndex][colIndex] = 1;
      } else {
        newGrid[rowIndex][colIndex] = 0;
      }

      return newGrid;
    });
  }
  // const buttonAnimationSettings = {
  //   cellChange: {
  //     opacity: 0,
  //   }
  // };
  return (
    <div className="grid">
      <table className="gridTable">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr>
              {row.map((value, colIndex) => (
                <td>
                  <AnimatePresence mode="wait">
                    <motion.img
                      src={
                        value === 1
                          ? `${process.env.PUBLIC_URL}/assets/redSquare.png`
                          : `${process.env.PUBLIC_URL}/assets/greySquare.png`
                      }
                      width={resolution}
                      onClick={(e) => cellClicked(rowIndex, colIndex)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1}}
                      transition={{ duration: 2, type: "spring" }}
                    />
                  </AnimatePresence>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameGrid;
