import React from 'react';
import { useNavigate } from "react-router-dom";

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

    return (
        <div>
            <button onClick={goSort}>Sorting Algorithms</button>
            <button onClick={goSearch}>Binary Search</button>
            <button onClick={goSudoku}>Sudoku Solver</button>
        </div>
    )
}

export default NavBar;