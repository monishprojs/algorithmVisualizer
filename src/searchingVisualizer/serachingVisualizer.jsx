import React from 'react';
import './searchingVisualizer.css';
import { useEffect, useState } from 'react';
import getMergeSortAnimations from '../sortingAlgorithms/mergeSort';

function SearchingVisualizer(){
    const [Sorted,setSorted] = useState([]);
    const [res,setRes] = useState("");

    function resetArray() {
        resetColors();
        let tmp = [];
        for (let i = 0; i < 15; i++) {
            tmp.push(Math.floor(Math.random() * 50))
        }
        getMergeSortAnimations(tmp);
        setSorted(tmp);
    }

    function resetColors(){
        setRes("");
        const squares = document.getElementsByClassName('square');
        for (let i = 0; i < squares.length; i++){
            squares[i].style.backgroundColor = "lightblue";
        }
    }

    function delay(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async function search(){
        resetColors();
        let toFind = document.getElementById('toFind').value
        console.log(toFind);
        let left = 0;
        let right = Sorted.length - 1;
        while (left <= right){
            let mid = Math.floor((left + right)/2);
            const squares = document.getElementsByClassName('square');
            squares[left].style.backgroundColor = "red";
            squares[right].style.backgroundColor = "red";
            squares[mid].style.backgroundColor = "green";
            await delay(2500);
            squares[left].style.backgroundColor = "lightblue";
            squares[right].style.backgroundColor = "lightblue";
            squares[mid].style.backgroundColor = "lightblue";
            if (Sorted[mid] > toFind){
                right = mid - 1
            }
            else if (Sorted[mid] < toFind){
                left = mid + 1;
            }
            else{
                squares[mid].style.backgroundColor = "green";
                setRes("Number found at index " + String(mid));
                return;
            }
        }
        setRes("Number Not Found");
    }


    useEffect(() => {
        resetArray()
    }, [])

    return (
        <div className='container'>
            <p>Result:</p>
            <p id='res'>{res}</p>
            {Sorted.map((value, index) => (
                <div className='square'
                    key={index}>
                        {value}
                </div>
            ))}
            <br />
            <input type="text" id='toFind'/>
            <button onClick={search}> Start Search</button>
            <br />
            <button onClick={resetArray}>Try New Array</button>
        </div>

    )
}

export default SearchingVisualizer;