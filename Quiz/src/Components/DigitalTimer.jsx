import React, { useEffect, useState } from 'react';

const DigitalTimer = ({ timer }) => {
    const [formattedTime, setFormattedTime] = useState('00:00');

    useEffect(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        setFormattedTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }, [timer]);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-gray-800">
                {formattedTime}
            </div>
            <div className="text-sm text-gray-600">Time Left</div>
        </div>
    );
};

export default DigitalTimer;
