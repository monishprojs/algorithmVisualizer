import React from 'react';
import './node.css'; 

const Node = ({ isWall, position, onClick }) => {
    const handleClick = () => {
        onClick(position);
    };

    return (
        <div
            className={`node ${isWall ? 'wall' : ''}`}
            onClick={handleClick}
        ></div>
    );
};

export default Node;