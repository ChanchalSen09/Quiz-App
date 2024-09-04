import React, { useMemo, useState } from 'react';

const QuestionCard = ({ question, handleAnswer, answerState, isAnswered }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = useMemo(() => {
        const allOptions = [...question.incorrect_answers, question.correct_answer];
        return allOptions.sort(() => Math.random() - 0.5);
    }, [question]);

    const handleOptionClick = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        handleAnswer(option === question.correct_answer);
    };

    return (
        <div className="max-w-lg p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg sm:max-w-md sm:p-4 md:max-w-lg md:p-6">
            <h2 className="mb-4 text-xl font-bold text-gray-800 sm:text-lg md:text-2xl">
                {question.question}
            </h2>
            <div className="flex flex-col space-y-3 sm:space-y-2 md:space-y-4">
                {options.map((option, index) => {
                    let buttonClass = "px-4 py-2 text-white font-medium rounded-lg shadow-md transition-transform transform hover:scale-105 ";

                    if (isAnswered) {
                        if (option === question.correct_answer) {
                            buttonClass += "bg-green-500 hover:bg-green-600";
                        } else if (option === selectedOption) {
                            buttonClass += "bg-red-500 hover:bg-red-600";
                        } else {
                            buttonClass += "bg-gray-400";
                        }
                    } else {
                        buttonClass += "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={buttonClass}
                            disabled={isAnswered}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionCard;
