// import { Route, Routes } from "react-router-dom";

// import About from "./pages/About";
// import Home from "./pages/Home";
// import ForgotPassword from "./Auth/forgotPassword";
// import Login from "./Auth/Login";
// import ResetPassword from "./Auth/ResetPassword";
// import TutorProfile from "./Profiles/TutorProfile";
// import LearnerProfile from "./Profiles/LearnerProfile";


// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => (
	
// 	<div>
// 		<Routes>
// 			<Route path="/" element={<Home />} />
// 			<Route path="/about/this/site" element={<About />} />

// 			{/*Forgot, login and reset PasswordRoutes test Mode */}
// 			<Route path="/forgot-password" element={<ForgotPassword />} />
// 			<Route path="/login" element={<Login />} />
// 			<Route path="/reset_password/:id/:token" element={<ResetPassword />} />
// 			{/* <Route path="/TutorProfile" element={<TutorProfile />} /> */}
// 			<Route path="/tutors/:tutorId" element={<TutorProfile />} />
// 			<Route path="/LearnerProfile" element={<LearnerProfile />} />
// 		</Routes>
// 		<ToastContainer />
// 	</div>
// );

// export default App;
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import Home from "./pages/Home";
import ForgotPassword from "./Auth/forgotPassword";
import Login from "./Auth/Login";
import ResetPassword from "./Auth/ResetPassword";
import TutorProfile from "./Profiles/TutorProfile";
import LearnerProfile from "./Profiles/LearnerProfile";

function App() {
	const tutorId = "52198";   // Placeholder but will be replace with the actual tutor ID
	const learnerId = "12508";  //Its Just a Placeholder It will replaced with the actual learner ID
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about/this/site" element={<About />} />
				{/*Forgot, login and reset PasswordRoutes test Mode */}
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/login" element={<Login />} />
				<Route path="/reset_password/:id/:token" element={<ResetPassword />} />
				{/* Pass tutorId and learnerId as a prop to TutorProfile and LeanerProfile components */}
				<Route path="/tutor-profile" element={<TutorProfile tutorId={tutorId} />} />
				<Route path="/learner-profile" element={<LearnerProfile learnerId={learnerId} />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
