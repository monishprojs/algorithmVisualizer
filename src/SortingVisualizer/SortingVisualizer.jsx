import React from 'react';
import './SortingVisualizer.css';
import { useEffect, useState } from 'react';
import getMergeSortAnimations from '../sortingAlgorithms/mergeSort.js';

function SortingVisualizer(){


    const[nums,setNums] = useState([])

    const PRIMARY_COLOR = 'turquoise';
    const SECONDARY_COLOR = 'red';
    const ANIMATION_SPEED_MS = 1;
    
    function resetArray(){
        let tmp = [];
        for (let i = 0; i < 100; i ++){
            tmp.push(Math.floor(Math.random() * 300))
        }
        setNums(tmp)
    }

    function mergeSort(){
        const animations = getMergeSortAnimations(nums);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    function quickSort() {

    }

    function heapSort() {

    }

    function bubbleSort() {

    }

    useEffect(() => {
        resetArray()
    }, [])
  
        return (
            <div className='container'>
            {nums.map((value,index) => (
                <div className='bar' 
                key={index}
                style={{height: String(value)+'px'}}>
                    
                </div>
            ))}
            <br />
            <button onClick={resetArray}>Try New Array</button>
            <button onClick={mergeSort}>Merge Sort</button>
            <button onClick={quickSort}>Quick Sort</button>
            <button onClick={heapSort}>Heap Sort</button>
            <button onClick={bubbleSort}>Bubble Sort</button>
            </div>
            
        )
}

export default SortingVisualizer;


