import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleScrollDown = () => {
        document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex flex-col items-center justify-center flex-grow p-6">
                <h1 className="mb-4 text-4xl font-extrabold text-blue-600">Welcome to the Quiz App!</h1>
                <p className="mb-8 text-lg text-gray-700">Test your knowledge and have fun!</p>
                <div className="max-w-2xl mb-8 text-center">
                    <p className="text-base text-gray-600">
                        Our Quiz App provides a fun and interactive way to test your knowledge across a variety of topics.
                        Challenge yourself with different levels of difficulty and track your progress over time.
                        Whether you're preparing for an exam or just want to learn something new, our quizzes are designed to keep you engaged and motivated.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Quiz Image 1"
                        className="object-cover w-32 h-32 rounded-lg shadow-md"
                    />
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Quiz Image 2"
                        className="object-cover w-32 h-32 rounded-lg shadow-md"
                    />
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Quiz Image 3"
                        className="object-cover w-32 h-32 rounded-lg shadow-md"
                    />
                </div>

                <button
                    onClick={() => navigate('/quiz-config')}
                    className="px-6 py-3 text-lg font-semibold text-white transition-transform transform bg-green-500 rounded-lg shadow-lg hover:scale-105 hover:bg-green-600"
                >
                    Start Quiz
                </button>

                <button
                    onClick={handleScrollDown}
                    className="mt-4 text-gray-500 animate-bounce"
                    aria-label="Scroll down"
                >
                    <svg
                        className="w-6 h-6 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </main>

            <footer id="footer" className="py-4 mt-auto text-center text-white bg-gray-800">
                <p className="text-sm">Developed and Design by Chanchal Sen</p>
                <p className="mt-1 text-xs">&copy; 2024 Quiz App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
