import React from 'react';
import './node.css'; 

const Node = ({ nodeType, isWall, position, onClick }) => {
    const handleClick = () => {
        onClick(position);
    };

    return (
        <div
            className={`node ${nodeType} ${isWall ? 'wall' : ''}`}
            onClick={handleClick}
        ></div>
    );
};

export default Node;