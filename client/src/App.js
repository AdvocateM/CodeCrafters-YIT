import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import ForgotPassword from "./Auth/forgotPassword";
import Login from "./Auth/Login";
import ResetPassword from "./Auth/ResetPassword";
import TutorProfile from "./Profiles/TutorProfile";
import LearnerProfile from "./Profiles/LearnerProfile";
import Nav from './Profiles/Nav'
import Users from "./Profiles/Users";
import Security from './Auth/Security'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
	<div>
	<Nav />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />

			{/*Forgot, login and reset PasswordRoutes test Mode */}
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/login" element={<Login />} />
			<Route path="/admin/users" element={<Users />} />
			<Route path="/reset_password/:id/:token" element={<ResetPassword />} />
			<Route path="/TutorProfile" element={<TutorProfile />} />
			<Route path="/LearnerProfile" element={<LearnerProfile />} />
			<Route path="/*" element={<Security />} />
		</Routes>
		<ToastContainer />
	</div>

);

export default App;
