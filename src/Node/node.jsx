// Node.jsx

import React from "react";
import "./node.css";

const Node = ({ nodeType, isWall, position, onClick, onMouseEnter }) => {
    const { row, col } = position;

    const handleNodeClick = () => {
        onClick({ row, col }, false);
    };

    const handleMouseEnter = () => {
        onMouseEnter({ row, col });
    };

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${nodeType}${isWall ? " wall" : ""}`}
            onClick={handleNodeClick}
            onMouseEnter={handleMouseEnter}
        ></div>
    );
};

export default Node;
