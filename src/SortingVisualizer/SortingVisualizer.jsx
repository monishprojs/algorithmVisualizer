import React from 'react';
import './SortingVisualizer.css';
import { useEffect, useState } from 'react';

function SortingVisualizer(){


    const[nums,setNums] = useState([])
    
    function resetArray(){
        let tmp = [];
        for (let i = 0; i < 100; i ++){
            tmp.push(Math.floor(Math.random() * 100))
        }
        setNums(tmp)
    }

    useEffect(() => {
        resetArray()
    }, [])
  
        return (
            <>
            {nums.map((value,index) => (
                <div className='bar' key={index}>
                    {value}
                </div>
            ))}
            </>
        )
}

export default SortingVisualizer;


