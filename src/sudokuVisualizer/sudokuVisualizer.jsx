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

    //function to updates all the intial squares bassed of user input
    function fillSquares(){
        const cells = document.getElementsByClassName('grid-cell');
        for (let i = 0; i < cells.length ; ++i){
                console.log(cells[i]);
                let indices = cells[i].id.split(".");
                console.log(indices);
                editBoard(indices[0],indices[1],cells[i].value);
            }
        if (!checkValid()){
            alert("bad board");
        }
        else{
            solve(0,0);
        }
        }
    

    //function to edit a specific squares value in the board
    function editBoard(row,col,val){
        if (val > 0 && val < 10){
        let tmp = [...board]
        tmp[row][col] =  val;
        setBoard(tmp);
        }
    }

    // method to check iv whole board is valid
    function checkValid(){
    //dictionaries for each row, column, and square to check if values are unique
    let rows = {}
    let cols = {}
    let squares = {}
    for (let i = 0; i < board.length; ++i){
        for (let j = 0; j < board[0].length; ++j){
            if (!(i in rows)) {
                rows[i] = new Set();
            }
            if (!(j in cols)) {
                cols[j] = new Set();
            }
            //map each square to a concatenated string of the floors of its indices
            if (!(String(Math.floor(i / 3)) + String(Math.floor(j / 3)) in squares)) {
                squares[String(Math.floor(i / 3)) + String(Math.floor(j / 3))] = new Set();
            }
            if (board[i][j] === "_"){
                continue;
            }
            //check for duplicate in same row, column, and square
            if (rows[i].has(String(board[i][j])) || cols[j].has(String(board[i][j])) || squares[String(Math.floor(i / 3)) + String(Math.floor(j / 3))].has(String(board[i][j]))){
                return false;
            }
            //if not a duplicate, add it to the dictionary for later comparison
            else {
                rows[i].add(String(board[i][j]));
                cols[j].add(String(board[i][j]));
                squares[String(Math.floor(i / 3)) + String(Math.floor(j / 3))].add(String(board[i][j]));
            }
        }
    }
    //if no duplicates were found in any rows, columns, or squares, return true
    return true;
    }


    //method to check if insertion of a value leads to validity or invalidity of board
    function checkVal(row,col,val){
        //check rows and columns
        for (let i = 0; i < board.length; ++i){
            if (board[row][i] === val || board[i][col] === val){
                return false
            }
        }

        //check squares
        let rowstart = (Math.floor((row / 3))) * 3;
        let colstart = (Math.floor((col / 3))) * 3;
        for (let i = 0; i < rowstart +3 ; ++ i){
            for (let j = 0; j < colstart + 3; ++j){
                if (board[i][j] === val){
                    return false;
                }
            }
        }
        //if not in any rows,columns, or squares
        return true
    }



    //method to solve the board
    function solve(row,col){
        if (row > board.length - 1){
            return true;
        }
        //advance a row once you've hit all the columns
        if (col > board[0].length - 1){
            return solve(row + 1, 0);
        }
        //jump to the next square if the square is a pre - filled square
        if (board[row][col] !== "_"){
            return solve(row, col + 1);
        }
        //check through all the values and see if they can be inserted
        for (let i = 1; i < 10; ++ i){
            if (checkVal(row, col, i)){
                editBoard(row,col,i);
                // check if the next square was able to filled(only then may this square keep its value)
                // this happens for eveyr square till eventually all of them have been filled, hitting the base case at the start
                if (!solve(row, col + 1)){
                    editBoard(row, col, "_");
                }
                else{
                    break;
                }
            
            }
            // if square was unable to be filled return False
            if (board[row][col] === "_"){
                return false;
            }
            else{
                return true;
            }
        }
    }

    return(
        <div>
            <button onClick={goSort}>Sorting Algorithms</button>
            <button onClick={goSearch}>Binary Search</button>
        <div className='grid-container'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((cell, columnIndex) => (        
                        <input className='grid-cell' key={`${rowIndex}.${columnIndex}`} id={`${rowIndex}.${columnIndex}`} type="text"/>
                    ))}
                </div>
            ))}
        </div>
        <br />
        <br />
        <button onClick={fillSquares}>Start Solving</button>
        </div>
    )
}

export default SudokuVisualizer;