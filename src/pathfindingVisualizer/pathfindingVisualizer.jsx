import React from 'react';
import './pathfindingVisualizer.css';
import { useEffect, useState } from 'react';
import Node from '../Node/node.jsx';
import NavBar from '../navBar/navBar';

function PathfindingVisualizer (){

    //variables for number of rows and columns
    const ROWS = 50;
    const COLS = 20;

    //state variables for grid, as well as start and end nodes
    const [grid, setGrid] = useState(() => createInitialGrid());
    const [startNode, setStartNode] = useState({ row: 0, col: 0 });
    const [endNode, setEndNode] = useState({ row: 0, col: 2 });

    //state variable used to check if we are drawing a wall by dragging the mouse
    const [isDrawingWall, setIsDrawingWall] = useState(false);

    //state variable to check if algorithm is running to prevent editing of board
    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

    //function to delay time
    function delay(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }



    //function to handle certain actions if a node is clicked
    function handleNodeClick (position, isDragging) {

        if (isAlgorithmRunning) {
            return;
        }

        const { row, col } = position;

        //Check if the clicked node is the start node or the end node
        if (row === startNode.row && col === startNode.col) {
            // remove start node
            setStartNode({ row: -1, col: -1 });
        } else if (row === endNode.row && col === endNode.col) {
            // remove end node
            setEndNode({ row: -1, col: -1 });
        } else {
            if (isDragging) {
                // When dragging, toggle the node to be a wall
                setGrid((prevGrid) => {
                    const newGrid = prevGrid.map((rowNodes) =>
                        rowNodes.map((node) =>
                            node.row === row && node.col === col ? { ...node, isWall: true } : node
                        )
                    );
                    return newGrid;
                });
            } else {
                // When not dragging, set the start or end node
                if (startNode.row === -1 && startNode.col === -1) {
                    // Set as the new start node if start node is not set
                    setStartNode({ row, col });
                } else if (endNode.row === -1 && endNode.col === -1) {
                    // Set as the new end node if end node is not set
                    setEndNode({ row, col });
                } else {
                    // If both start and end nodes are set, toggle the node to be a wall
                    setGrid((prevGrid) => {
                        const newGrid = prevGrid.map((rowNodes) =>
                            rowNodes.map((node) =>
                                node.row === row && node.col === col ? { ...node, isWall: !node.isWall } : node
                            )
                        );
                        return newGrid;
                    });
                }
            }
        }
    };



    // Function to create the initial grid of nodes, all of them being normal non-wall nodes
    function createInitialGrid() {
        const grid = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                const node = {
                    row,
                    col,
                    isWall: false,
                    distance: Infinity,    // Initialize distance to Infinity
                    previousNode: null,    // Initialize previousNode to null
                };
                currentRow.push(node);
            }
            grid.push(currentRow);
        }
        return grid;
    }

    //function to actually walk through the A* algorithm and obtain a list of visited nodes
    function visualizeAStar (){
        // Check if there is both a start node and an end node set
        if (startNode.row === -1 || startNode.col === -1 || endNode.row === -1 || endNode.col === -1) {
            alert("Please have a start node and an end node set!");
            return null;
        }

        //we use a grid copy for our computations as to not interfere with the original grid
        const gridCopy = createGridCopy();

        //here we set up the start node copy and visitedNodesInOrder array for the rest of the algorithm
        const startNodeCopy = gridCopy[startNode.row][startNode.col];
        startNodeCopy.distance = 0;
        const endNodeCopy = gridCopy[endNode.row][endNode.col];

        const visitedNodesInOrder = [];
        const unvisitedNodes = [startNodeCopy];
        startNodeCopy.isVisited = true;

        //loop through while we still have unvisited nodes
        while (unvisitedNodes.length > 0) {
            sortUnvisitedNodesByDistance(unvisitedNodes, startNodeCopy, endNodeCopy);

            //get the closest node
            const closestNode = unvisitedNodes.shift();

            //if a node is a wall we want to skip looking at it
            if (closestNode.isWall) continue;

            //in the case of distance being inf, we know the end node is unreachable
            if (closestNode.distance === Infinity) {
                // No valid path found
                console.log("No valid path found!");
                setGrid(gridCopy); // Update the grid with visited nodes for visualization
                return []; // Return an empty array to indicate no valid path is found
            }

            //if the node passes the above two checks we can add it to the array
            visitedNodesInOrder.push(closestNode);

            //if the node is the end node we know that the algorithm is done
            if (closestNode.row === endNodeCopy.row && closestNode.col === endNodeCopy.col) {
                // Path found
                console.log("Path found!");
                setGrid(gridCopy); // Update the grid with visited nodes for visualization
                return visitedNodesInOrder;
            }

            //mark node as visited after we're done with it
            closestNode.isVisited = true;
            updateUnvisitedNeighbors(closestNode, gridCopy, unvisitedNodes);
        }

        console.log("No valid path found!");
        return []; // Return an empty array to indicate no valid path is found
    };


    //function to create a copy of the grid to be used during A* algorithm computations
    function createGridCopy() {
        const newGrid = [];
        for (let row = 0; row < ROWS; row++) {
            const newRow = [];
            for (let col = 0; col < COLS; col++) {
                newRow.push({
                    ...grid[row][col],
                    isVisited: false,
                    previousNode: null,
                    distance: Infinity,
                });
            }
            newGrid.push(newRow);
        }
        return newGrid;
    };


    //function to sort unvisited nodes using their distance property
    function sortUnvisitedNodesByDistance (unvisitedNodes, startNode, endNode)  {
        unvisitedNodes.sort(
            (nodeA, nodeB) =>
                nodeA.distance + heuristicDistance(nodeA, endNode) - (nodeB.distance + heuristicDistance(nodeB, endNode))
        );
    };

    //function to get distances between nodes
    function heuristicDistance (nodeA, nodeB) {
        //Manhattan distance as heuristic, as it is more accurate for A*
        return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
    };

    //function to obtain predecessor nodes
    function updateUnvisitedNeighbors (node, gridCopy, unvisitedNodes) {
        const neighbors = getNeighbors(node, gridCopy);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                const newDistance = node.distance + 1; // Assuming the distance between adjacent nodes is 1

                // Update the neighbor's distance and previousNode properties if the new distance is smaller
                if (newDistance < neighbor.distance) {
                    neighbor.distance = newDistance;
                    neighbor.previousNode = node;
                }

                // Add the neighbor to the unvisitedNodes array if it's not already present
                if (!unvisitedNodes.includes(neighbor)) {
                    unvisitedNodes.push(neighbor);
                }
            }
        }
    };


    //function to get the neighbors of a node
    function getNeighbors (node, grid) {
        const neighbors = [];
        const { row, col } = node;
        const numRows = grid.length;
        const numCols = grid[0].length;

        // Check top neighbor
        if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col]);

        // Check bottom neighbor
        if (row < numRows - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col]);

        // Check left neighbor
        if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1]);

        // Check right neighbor
        if (col < numCols - 1 && !grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1]);

        return neighbors;
    };


    //function to obtain shortest path backtracking from the end node
    function getShortestPath (endNodeCopy) {
        const shortestPath = [];
        let currentNode = endNodeCopy;
        while (currentNode !== null) {
            shortestPath.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return shortestPath;
    };


    //async function that does the animation using array of nodes
    async function animateNodes (nodes, className) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const { row, col } = node;
            const nodeElement = document.getElementById(`node-${row}-${col}`);
            if (nodeElement) {
                // Skip changing class if it's the start or end node
                if (
                    (row === startNode.row && col === startNode.col) ||
                    (row === endNode.row && col === endNode.col)
                ) {
                    continue;
                }

                nodeElement.classList.add(className); // Add the specified class to the node (visited or shortest)
                await delay(5); // Delay before highlighting the next node
            }
        }
    };


    //function to reset the grid to a base state
    function resetGrid() {
        const updatedGrid = grid.map((row) =>
            row.map((node) => {
                if (
                    (node.row !== startNode.row || node.col !== startNode.col) &&
                    (node.row !== endNode.row || node.col !== endNode.col)
                ) {
                    return {
                        ...node,
                        isVisited: false,
                        previousNode: null,
                        distance: Infinity,
                        isWall: false,
                    };
                } else {
                    // Preserve the isVisited property of start and end nodes
                    return {
                        ...node,
                        isWall: false,
                        previousNode: null,
                        distance: Infinity,
                    };
                }
            })
        );

        // Clear the visited and shortest-path CSS classes
        const nodes = document.querySelectorAll(".node");
        nodes.forEach((node) => {
            node.classList.remove("visited");
            node.classList.remove("shortest-path");
        });

        //update the grid
        setGrid(updatedGrid);
    };


    //general function for visualization that calls prior functions for actual logic
    async function visualizeAlgorithm () {

        resetGrid();

        setIsAlgorithmRunning(true);

        if (!startNode || !endNode) {
            alert("Please have a start node and an end node set!");
            setIsAlgorithmRunning(false);
            return;
        }

        const visitedNodesInOrder = await visualizeAStar(); // Await the result of visualizeAStar()


        //case where start or end node not set
        if (visitedNodesInOrder === null){
            setIsAlgorithmRunning(false);
            return;
        }
        //case where there is no path
        else if (visitedNodesInOrder.length === 0) {
            alert("No valid path found!");
            setIsAlgorithmRunning(false);
            return;
        }

        //the last entry of visitedNodesInOrder is the end node
        const shortestPath = getShortestPath(visitedNodesInOrder[visitedNodesInOrder.length - 1]);

        // Highlight the visited nodes for visualization
        await animateNodes(visitedNodesInOrder, 'visited');

        // Highlight the shortest path for visualization
        await animateNodes(shortestPath, 'shortest-path');
        
        setIsAlgorithmRunning(false);
        
    };

    return (
        <div className="visualizerContainer">
            <NavBar />
            <h3>Usage Guide:</h3>
            <ul>
                <li>You can change the start node and end nodes by clicking on them to toggle them off and then clicking on the new desired start/end node</li>
                <li>You can also click on a node to toggle it as a wall (as long as start and end nodes are set), as well as drag the mouse over nodes to set many walls at a time</li>
            </ul>
            <div
                className="visualizer"
                onMouseDown={() => setIsDrawingWall(true)}
                onMouseUp={() => setIsDrawingWall(false)}
            >
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((node, colIndex) => (
                            <Node
                                key={`${rowIndex}-${colIndex}`}
                                nodeType={
                                    rowIndex === startNode.row && colIndex === startNode.col
                                        ? "start"
                                        : rowIndex === endNode.row && colIndex === endNode.col
                                            ? "end"
                                            : "normal"
                                }
                                isWall={node.isWall}
                                position={{ row: rowIndex, col: colIndex }}
                                onClick={handleNodeClick}
                                onMouseEnter={(e) => {
                                    if (isDrawingWall) handleNodeClick({ row: rowIndex, col: colIndex }, true);
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <br />
            <button onClick={visualizeAlgorithm}>Find Shortest Path</button>
            <button onClick={resetGrid}>Reset the Grid</button>
        </div>
    );
};

export default PathfindingVisualizer;