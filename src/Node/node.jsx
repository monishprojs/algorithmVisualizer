import React from 'react';
import './node.css'; 

const Node = ({ nodeType, isWall, distance, onClick, position }) => {
    const { row, col } = position;

    let extraClassName = '';
    if (nodeType === 'start') extraClassName = 'start';
    else if (nodeType === 'end') extraClassName = 'end';
    else if (isWall) extraClassName = 'wall';

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onClick={() => onClick(position)}
        >
            {/* Display the distance as content inside the node */}
            {typeof distance === 'number' && <span className="distance-label">{distance}</span>}
        </div>
    );
};


export default Node;