import React from 'react';
import './SortingVisualizer.css';
import { useEffect, useState } from 'react';
import getMergeSortAnimations from '../sortingAlgorithms/mergeSort.js';
import getQuickSortAnimations from '../sortingAlgorithms/quickSort.js';
import getHeapSortAnimations from '../sortingAlgorithms/heapSort.js';
import getBubbleSortAnimations from '../sortingAlgorithms/bubbleSort';
import { useNavigate } from "react-router-dom";
import Slider from '../slider';

function SortingVisualizer(){

    const navigate = useNavigate();

    function goSearch() {
        navigate("/searching");
    }

    function goSudoku(){
        navigate("/sudoku");
    }

    const[nums,setNums] = useState([]);
    const [sliderValue, setSliderValue] = useState(100);

    const PRIMARY_COLOR = 'lightblue';
    const SECONDARY_COLOR = 'red';
    const ANIMATION_SPEED_MS = 10;

    const labels = Array.from({ length: 10 }, (_, index) => ({
        value: (index + 1) * 10,
        label: ((index + 1) * 10).toString(),
    }));
    const labelStep = 1;

    
    function resetArray(cap){
        let tmp = [];
        for (let i = 0; i < cap; i ++){
            tmp.push(Math.floor(Math.random() * 300))
        }
        setNums(tmp)
    }


    //function to pause the sorting solver
    function sleep(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    //function to run merge sort
    function mergeSort() {
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

    //function to run bubble, heap, and quick sort
    async function getSortAnimations(type) {
        console.log(nums);
        let ans = []
        if (type === 'quick'){
        ans = getQuickSortAnimations(nums);
        }
        else if (type === 'heap'){
            ans = getHeapSortAnimations(nums);
        }
        else if (type === 'bubble'){
            ans = getBubbleSortAnimations(nums);
        }
        else{
            return;
        }
        const sorted = ans[0];
        const animations = ans[1];
        console.log(animations);
        console.log(sorted);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('bar');

            //odd indices in animations means to highlight them to show which indices are being compared, even means to swap heights
            const isColorChange = i % 2;

            //case where we are comparing them to swap, so we highlight them in red
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
                await sleep(ANIMATION_SPEED_MS);
                //remove highlight after a delay
                barOneStyle.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;

            } 
            //in this case we swap their heights in the ui
            else {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let tmp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tmp;
                await sleep(ANIMATION_SPEED_MS);
      
            }
        }
    }

    const handleSliderChange = (value) => {
        setSliderValue(value);
        console.log(value);
        resetArray(value);
    };

    useEffect(() => {
        resetArray(100)
    }, [])
  


        return (
            <div className='container'>
                <button onClick={goSearch}>Binary Search</button>
                <button onClick={goSudoku}>Sudoku Solver</button>
                <div>
                    <Slider
                        min={10}
                        max={100}
                        step={1}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        labels={labels}
                        labelStep={labelStep}
                    />
                </div>
                <br />
            <div className='map'>
            {nums.map((value,index) => (
                <div className='bar' 
                key={index}
                style={{height: String(value)+'px', width:String(700/sliderValue)+'px'}}>
                    
                </div>
            ))}
            </div>
            <br />
            <button onClick={() => resetArray(sliderValue)}>Try New Array</button>
            <button onClick={() => mergeSort()}>Merge Sort</button>
            <button onClick={() => getSortAnimations('quick')}>Quick Sort</button>
            <button onClick={() => getSortAnimations('heap')}>Heap Sort</button>
                <button onClick={() => getSortAnimations('bubble')}>Bubble Sort</button>
            </div>
            
        )
}

export default SortingVisualizer;


