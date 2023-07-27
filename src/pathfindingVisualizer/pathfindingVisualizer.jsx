import React from 'react';
import './pathfindingVisualizer.css';
import { useEffect, useState } from 'react';
import Node from '../Node/node.jsx';
import NavBar from '../navBar/navBar';

function PathfindingVisualizer (){

    const ROWS = 50;
    const COLS = 20;

    function createInitialGrid (){
        const grid = [];

        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                const node = {
                    row,
                    col,
                    isWall: false, 
                };
                currentRow.push(node);
            }
            grid.push(currentRow);
        }

        return grid;
    };


    const [grid, setGrid] = useState(() => createInitialGrid());

    const handleNodeClick = (position) => {
        const { row, col } = position;
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((rowNodes) =>
                rowNodes.map((node) =>
                    node.row === row && node.col === col
                        ? { ...node, isWall: !node.isWall }
                        : node
                )
            );
            return newGrid;
        });
    };

    useEffect(() => {
        createInitialGrid()
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            <div className="visualizer">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((node, colIndex) => (
                            <Node
                                key={`${rowIndex}-${colIndex}`}
                                isWall={node.isWall}
                                position={{ row: rowIndex, col: colIndex }}
                                onClick={handleNodeClick}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PathfindingVisualizer;