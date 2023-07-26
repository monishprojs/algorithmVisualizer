import React from 'react';

const Slider = ({ min, max, step, value, labels, labelStep, onChange }) => {
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value); // Convert the value to an integer
        onChange(newValue);
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {labels.map((labelData) => (
                    <div key={labelData.value}>
                        {labelData.label}
                    </div>
                ))}
            </div>
            <span>{value}</span>
        </div>
    );
};

export default Slider;
