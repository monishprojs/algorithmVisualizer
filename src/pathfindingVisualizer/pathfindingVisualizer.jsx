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
    const [endNode, setEndNode] = useState({ row: 0, col: 2 });

    //state variable used to check if we are drawing a wall by dragging the mouse
    const [isDrawingWall, setIsDrawingWall] = useState(false);

    //function to delay time
    function delay(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }


    const handleMouseUp = () => {
        console.log('Mouse Up');
        setIsDrawingWall(false);
    };


    const handleNodeClick = (position, isDragging) => {
        const { row, col } = position;

        // Check if the clicked node is the start node or the end node
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
                    // Set as the new start node
                    setStartNode({ row, col });
                } else if (endNode.row === -1 && endNode.col === -1) {
                    // Set as the new end node
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

    const visualizeAStar = async () => {

        // Check if there is an end node set
        if (startNode.row === -1 || startNode.col === -1 || endNode.row === -1 || endNode.col === -1) {
            alert("Please have a start node and an end node set!");
            return null;
        }

        console.log("running a star");
        const gridCopy = createGridCopy();
        const startNodeCopy = gridCopy[startNode.row][startNode.col];
        startNodeCopy.distance = 0;
        const endNodeCopy = gridCopy[endNode.row][endNode.col];
        startNodeCopy.previousNode = null;

        const visitedNodesInOrder = [];
        const unvisitedNodes = [startNodeCopy];
        startNodeCopy.isVisited = true;

        while (unvisitedNodes.length > 0) {
            console.log("in a star loop");
            console.log("Unvisited Nodes Count:", unvisitedNodes.length);
            sortUnvisitedNodesByDistance(unvisitedNodes, startNodeCopy, endNodeCopy);

            const closestNode = unvisitedNodes.shift();
            if (closestNode.isWall) continue;

            if (closestNode.distance === Infinity) {
                // No valid path found
                console.log("No valid path found!");
                setGrid(gridCopy); // Update the grid with visited nodes for visualization
                return []; // Return an empty array instead of null
            }

            visitedNodesInOrder.push(closestNode);
            console.log("Visiting node:", closestNode);

            if (closestNode.row === endNodeCopy.row && closestNode.col === endNodeCopy.col) {
                // Path found
                console.log("Path found!");
                setGrid(gridCopy); // Update the grid with visited nodes for visualization
                return visitedNodesInOrder;
            }

            updateUnvisitedNeighbors(closestNode, gridCopy, unvisitedNodes);
        }

        console.log("No valid path found!");
        return []; // Return an empty array instead of null
    };



    const createGridCopy = () => {
        return grid.map((row) =>
            row.map((node) => ({
                ...node,
                isVisited: false,
                previousNode: null,
            }))
        );
    };

    const getInitialUnvisitedNodes = (grid) => {
        const unvisitedNodes = [];
        for (const row of grid) {
            for (const node of row) {
                const copiedNode = { ...node };
                copiedNode.distance = Infinity;
                copiedNode.previousNode = null;
                unvisitedNodes.push(copiedNode);
            }
        }
        return unvisitedNodes;
    };


    const sortUnvisitedNodesByDistance = (unvisitedNodes, startNode, endNode) => {
        console.log("Unsorted unvisitedNodes:", unvisitedNodes);
        unvisitedNodes.sort(
            (nodeA, nodeB) =>
                nodeA.distance + heuristicDistance(nodeA, endNode) - (nodeB.distance + heuristicDistance(nodeB, endNode))
        );
        console.log("Sorted unvisitedNodes:", unvisitedNodes);
    };

    const heuristicDistance = (nodeA, nodeB) => {
        // Manhattan distance as heuristic (can also use Euclidean distance)
        return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
    };

    const updateUnvisitedNeighbors = (node, gridCopy, unvisitedNodes) => {
        const neighbors = getNeighbors(node, gridCopy);
        for (const neighbor of neighbors) {
            if (!neighbor.isWall && !neighbor.isVisited) {
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



    const getNeighbors = (node, grid) => {
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

        console.log("Neighbors for node:", node, neighbors);
        return neighbors;
    };




    const getShortestPath = (endNodeCopy) => {
        const shortestPath = [];
        let currentNode = endNodeCopy;
        console.log("getting shortest path");
        while (currentNode !== null) {
            console.log(currentNode)
            shortestPath.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return shortestPath;
    };


    const animateNodes = async (nodes, className) => {
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

                nodeElement.classList.add(className); // Add the specified class to the node
                await delay(5); // Delay before highlighting the next node
            }
        }
    };


    //function to reset the grid
    const resetGrid= () => {
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

        setGrid(updatedGrid);
    };

    //general function for visualization that calls extraneous functions for actual logic
    const visualizeAlgorithm = async () => {

        if (!startNode || !endNode) {
            alert("Please have a start node and an end node set!");
            return;
        }

        resetGrid();

        const gridCopy = createGridCopy();

        const visitedNodesInOrder = await visualizeAStar(); // Await the result of visualizeAStar()

        //case where start or end node not set
        if (visitedNodesInOrder == null){
            return
        }


        //case where there is no path
        if (visitedNodesInOrder.length === 0) {
            alert("No valid path found!");
            return;
        }


        console.log("Visited Nodes: ", visitedNodesInOrder);
        //the last entry of visitedNodesInOrder is the end node
        const shortestPath = getShortestPath(visitedNodesInOrder[visitedNodesInOrder.length - 1]);
        console.log("Shortest Path: ", shortestPath);

        // Highlight the visited nodes for visualization
        await animateNodes(visitedNodesInOrder, 'visited');

        // Highlight the shortest path for visualization
        await animateNodes(shortestPath, 'shortest-path');
    };




    return (
        <div className="visualizerContainer">
            <NavBar />
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
            <button onClick={visualizeAlgorithm}>Find Shortest Path</button>
            <button onClick={resetGrid}>Reset the Grid</button>
        </div>
    );
};

export default PathfindingVisualizer;