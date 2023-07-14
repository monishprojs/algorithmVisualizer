import React from 'react';
import './searchingVisualizer.css';
import { useEffect, useState } from 'react';
import getMergeSortAnimations from '../sortingAlgorithms/mergeSort';

function SearchingVisualizer(){
    const [Sorted,setSorted] = useState([])

    function resetArray() {
        let tmp = [];
        for (let i = 0; i < 15; i++) {
            tmp.push(Math.floor(Math.random() * 50))
        }
        getMergeSortAnimations(tmp);
        setSorted(tmp);
        console.log(Sorted);
    }


    useEffect(() => {
        resetArray()
    }, [])

    return (
        <div className='container'>
            {Sorted.map((value, index) => (
                <div className='square'
                    key={index}>
                        {value}
                </div>
            ))}
            <br />
            <button onClick={resetArray}>Try New Array</button>
        </div>

    )
}

export default SearchingVisualizer;