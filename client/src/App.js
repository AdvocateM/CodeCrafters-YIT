import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import ForgotPassword from "./Auth/forgotPassword";
import Login from "./Auth/Login";
import ResetPassword from "./Auth/ResetPassword";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPageForm from "./AdminPageForm";
 
const App = () => (
	<div>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />

			{/*Forgot, login and reset PasswordRoutes test Mode */}
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/login" element={<Login />} />
			<Route path="/reset_password/:id/:token" element={<ResetPassword />} />
			<Route path="/AdminPageForm" element={<AdminPageForm />} />

		</Routes>
		<ToastContainer />	
	</div>
	
);

export default App;
