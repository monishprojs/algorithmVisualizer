import React from 'react';
import './pathfindingVisualizer.css';
import { useEffect, useState } from 'react';
import Node from '../Node/node.jsx';
import NavBar from '../navBar/navBar';

function PathfindingVisualizer (){

    const ROWS = 50;
    const COLS = 20;
    const [grid, setGrid] = useState(() => createInitialGrid());
    const [startNode, setStartNode] = useState({ row: 0, col: 0 });
    const [endNode, setEndNode] = useState({ row: 9, col: 19 });

    //function create the intiial grid of nodes, all of them a normal non-wall nodes
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

    const handleNodeClick = (position) => {
        const { row, col } = position;

        // Check if the clicked node is the start node or the end node
        if (row === startNode.row && col === startNode.col) {
            // remove start node
            setStartNode({ row: -1, col: -1 });
        } else if (row === endNode.row && col === endNode.col) {
            // remove end node
            setEndNode({ row: -1, col: -1 });
        } else {
            // Clicked on a normal node, updateif start node or end node is not set update them
            if (startNode.row === -1 && startNode.col === -1) {
                // Set as the new start node
                setStartNode({ row, col });
            } else if (endNode.row === -1 && endNode.col === -1) {
                // Set as the new end node
                setEndNode({ row, col });
            } else {
                // toggle a node to be a wall
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
            }
        }
    };

    return (
        <div className='visualizerContainer'>
            <NavBar></NavBar>
        <div className="visualizer">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((node, colIndex) => (
                        <Node
                            key={`${rowIndex}-${colIndex}`}
                            nodeType={
                                rowIndex === startNode.row && colIndex === startNode.col
                                    ? 'start'
                                    : rowIndex === endNode.row && colIndex === endNode.col
                                        ? 'end'
                                        : 'normal'
                            }
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