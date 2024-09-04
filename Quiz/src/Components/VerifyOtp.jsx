import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
            toast.success('We sent an OTP to your email. Please check it.', { position: "top-center" });
        } else {
            toast.error('Email not found. Please start the verification process again.', { position: "top-center" });
        }
    }, []);

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Email is required to verify OTP.', { position: "top-center" });
            return;
        }

        try {
            const response = await fetch('https://quiz-app-sandy-one.vercel.app/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (response.ok) {
                // Store the token and other user data in localStorage
                localStorage.setItem('token', data.token);  // Storing the JWT token
                localStorage.setItem('userId', data.userId);

                toast.success('OTP verified successfully!', { position: "top-center" });
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error(data.message || 'OTP verification failed. Please try again.', { position: "top-center" });
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.error('An error occurred during OTP verification. Please try again later.', { position: "top-center" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleVerify} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Verify OTP</h2>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
                    Verify
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default VerifyOTP;
