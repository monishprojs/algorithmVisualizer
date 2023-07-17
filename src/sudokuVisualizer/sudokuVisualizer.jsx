import React from 'react';
import './sudokuVisualizer.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function SudokuVisualizer(){

    const navigate = useNavigate();
    function goSearch() {
        navigate("/searching");
    }
    function goSort() {
        navigate("/sorting");
    }

    const [board,setBoard] = useState([
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ])

    function editBoard(row,col,val){
        let tmp = [...board]
        tmp[row][col] =  val;
        setBoard(tmp);
    }

    function solve(){

    }

    return(
        <div className='container'>
            <button onClick={goSearch}>Binary Search</button>
            <button onClick={goSort}>Array Sorting Algorithms</button>
        </div>
    )
}

export default SudokuVisualizer;