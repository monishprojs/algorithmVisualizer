import React from 'react';
import './SortingVisualizer.css';
import { useEffect, useState } from 'react';
import getMergeSortAnimations from '../sortingAlgorithms/mergeSort.js';
import getQuickSortAnimations from '../sortingAlgorithms/quickSort.js';
import getHeapSortAnimations from '../sortingAlgorithms/heapSort.js';
import { useNavigate } from "react-router-dom";

function SortingVisualizer(){

    const navigate = useNavigate();
    function goSearch() {
        navigate("/searching");
    }


    const[nums,setNums] = useState([])

    const PRIMARY_COLOR = 'lightblue';
    const SECONDARY_COLOR = 'red';
    const ANIMATION_SPEED_MS = 10;
    
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
        const ans = getQuickSortAnimations([...nums])
        const sorted = ans[0];
        const animations = ans[1];
        console.log(sorted);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('bar');

            //odd indices in animations mean they are to be highlighted, even means their heights are to be switched and colors to return back to normal
            const isColorChange = i % 3 !== 2;

            //case where we are comparing them to swap, so we highlight them in red
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } 
            //now we swap their hights and unhighlight them
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    function heapSort() {
        const animations = getHeapSortAnimations([...nums])
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('bar');

            //odd indices in animations mean they are to be highlighted, even means their heights are to be switched and colors to return back to normal
            const isColorChange = i % 3 !== 2;

            //case where we are comparing them to swap, so we highlight them in red
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            //now we swap their hights and unhighlight them
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    function bubbleSort() {

    }

    useEffect(() => {
        resetArray()
    }, [])
  
        return (
            <div className='container'>
                <button onClick={goSearch} className="homeButton">Binary Search</button>
                <br />
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


