import React from 'react';
import { useNavigate } from "react-router-dom";
import './navBar.css';

function NavBar(){

    const navigate = useNavigate();
    function goSearch() {
        navigate("/searching");
    }
    function goSort() {
        navigate("/sorting");
    }
    function goSudoku(){
        navigate("/sudoku");
    }
    function goPathfinding() {
        navigate("/pathfinding");
    }

    return (
        <div className='navBar'>
            <button onClick={goPathfinding}>Pathfinding Visualizer</button>
            <button onClick={goSort}>Sorting Algorithms</button>
            <button onClick={goSudoku}>Sudoku Solver</button>
            <button onClick={goSearch}>Binary Search</button>
        </div>
    )
}

export default NavBar;