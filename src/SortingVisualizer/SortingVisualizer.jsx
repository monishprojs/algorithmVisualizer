import React from 'react';
import './SortingVisualizer.css';
import { useEffect, useState } from 'react';

function SortingVisualizer(){


    const[nums,setNums] = useState([])
    
    function resetArray(){
        let tmp = [];
        for (let i = 0; i < 100; i ++){
            tmp.push(Math.floor(Math.random() * 300))
        }
        setNums(tmp)
    }

    function mergeSort(){
        
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


