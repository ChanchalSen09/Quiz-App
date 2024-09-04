import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/Context';
import axios from 'axios';

const UserProfile = () => {
    const { userId } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log(userId);

                const profileResponse = await axios.get(`https://quiz-app-sandy-one.vercel.app/api/auth/userProfile/${userId}`);
                if (profileResponse.data && Array.isArray(profileResponse.data.scores)) {
                    setUserInfo(profileResponse.data);
                } else {
                    setUserInfo({ username: '', email: '', scores: [] });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserInfo({ username: '', email: '', scores: [] });
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    if (userInfo === null) {
        return <p className="text-gray-500"> console.log(userId);  Loading...</p>;
    }

    const totalPages = Math.ceil((userInfo.scores ? userInfo.scores.length : 0) / itemsPerPage);
    const currentScores = userInfo.scores ? userInfo.scores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    return (
        <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
            <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <img
                        src="https://i.pinimg.com/564x/30/a9/52/30a9520164af6b6e312bdc135a10af3b.jpg"
                        alt="User Avatar"
                        className="w-32 h-32 mb-4 rounded-full shadow-md"
                    />
                    <h1 className="text-2xl font-bold text-blue-800">{userInfo.username}</h1>
                    <p className="text-gray-700">{userInfo.email}</p>
                </div>
                <hr className="my-6 border-gray-300" />
                <h2 className="mb-4 text-xl font-semibold text-blue-800">Test History</h2>
                {userInfo.scores && userInfo.scores.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
                            {currentScores.map((score, index) => (
                                <div key={index} className="p-4 bg-gray-200 rounded-lg shadow">
                                    <p className="text-lg font-medium text-blue-600">Quiz ID: {score.quizId}</p>
                                    <p className="text-gray-700">Score: {score.score}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(score.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 bg-gray-200 rounded-lg">{`Page ${currentPage} of ${totalPages}`}</span>
                            <button
                                onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">No test history available.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
