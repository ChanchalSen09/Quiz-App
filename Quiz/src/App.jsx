import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import QuizPage from './Components/QuizPage';
import ResultPage from './Components/ResultPage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Layout from './Components/Layout';
import AuthRoute from './Routes/Auth';
import VerifyOTP from './Components/VerifyOtp';
import { AuthProvider } from './Context/Context';
import QuizConfig from './Components/QuizConfig';
import About from './Components/About';
import ProfilePage from "./Components/UserProfile";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<AuthRoute component={ProfilePage} />} />
            <Route path="quiz-config" element={<AuthRoute component={QuizConfig} />} />
            <Route path="quiz" element={<AuthRoute component={QuizPage} />} />
            <Route path="result" element={<AuthRoute component={ResultPage} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
