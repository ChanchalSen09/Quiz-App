import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import DigitalTimer from './DigitalTimer';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(60);
    const [isAnswered, setIsAnswered] = useState(false);
    const [answerState, setAnswerState] = useState(null);
    const [quizId, setQuizId] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { numQuestions, category, difficulty, type } = location.state;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php', {
                    params: {
                        amount: numQuestions,
                        category,
                        difficulty,
                        type,
                    },
                });
                setQuestions(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [numQuestions, category, difficulty, type]);

    useEffect(() => {
        const generatedQuizId = Math.random().toString(36).substr(2, 10).toUpperCase();
        console.log(generatedQuizId);
        setQuizId(generatedQuizId);
    }, []);

    useEffect(() => {
        if (timer === 0 && !isAnswered) {
            handleAnswer(false);
        }
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, isAnswered]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
            setAnswerState('correct');
        } else {
            setAnswerState('incorrect');
        }
        setIsAnswered(true);
    };

    const nextQuestion = () => {
        if (!isAnswered) return;
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setTimer(60);
            setIsAnswered(false);
            setAnswerState(null);
        } else {
            handleFinishTest();
        }
    };

    const skipQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setTimer(60);
            setIsAnswered(false);
            setAnswerState(null);
        } else {
            handleFinishTest();
        }
    };

    const handleFinishTest = () => {
        navigate('/result', { state: { score, quizId } });
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 bg-gray-100 md:space-y-0 md:flex-row md:items-start">
            {questions.length > 0 && (
                <>
                    <DigitalTimer timer={timer} />
                    <div className="flex flex-col items-center justify-center w-full max-w-2xl p-4 bg-white rounded shadow-lg md:flex-grow">
                        <div className="mb-6 text-center">
                            <p className="text-lg font-semibold text-blue-600">Questions Remaining: {questions.length - currentQuestionIndex - 1}</p>
                            <p className="text-lg font-semibold text-blue-600">Questions Done: {currentQuestionIndex}</p>
                        </div>
                        <QuestionCard
                            question={questions[currentQuestionIndex]}
                            handleAnswer={handleAnswer}
                            answerState={answerState}
                            isAnswered={isAnswered}
                        />
                        <div className="flex flex-wrap justify-center mt-4 space-x-2 space-y-2">
                            <div className="flex mt-4 space-x-4">
                                <button
                                    onClick={nextQuestion}
                                    disabled={!isAnswered}
                                    className={`w-1/2 px-4 py-2 font-bold text-white rounded-lg shadow-md transition duration-300 ${isAnswered ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                >
                                    Next Question
                                </button>
                                <button
                                    onClick={skipQuestion}
                                    className="w-1/2 px-4 py-2 font-bold text-white transition duration-300 bg-red-500 rounded-lg shadow-md hover:bg-red-600"
                                >
                                    Skip Question
                                </button>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizPage;
