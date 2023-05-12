import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./Auth/Combined";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/forgotPassword";
import TutorProfile from "./Profiles/TutorProfile";
import LearnerProfile from "./Profiles/LearnerProfile";

// import About from "./Components/About";
// import Contact from "./Components/Contact"
// import Portfolio from "./Components/Portfolio";
	const tutorId = "52198"; // Placeholder but will be replace with the actual tutor ID
	const learnerId = "12508"; //Its Just a Placeholder It will replaced with the actual learner ID

function App() {
	
	return (
		<div>
			<header>
				<nav>
					<h1>YIT</h1>
					<NavLink to="/">Home</NavLink>
					<NavLink to="Login">Login</NavLink>

					{/* <NavLink to="About">About</NavLink>
     <NavLink to="Contact">Contact Us</NavLink>
     <NavLink to="Portfolio">Portfolio</NavLink> */}
				</nav>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					{/* Pass tutorId and learnerId as a prop to TutorProfile and LeanerProfile components */}
					<Route path="/tutor-profile" element={<TutorProfile tutorId={tutorId} />}/>
					<Route path="/learner-profile" element={<LearnerProfile learnerId={learnerId} />}/>
					{/* <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Portfolio" element={<Portfolio />} /> */}
				</Routes>
			</main>
		</div>
	);
}

export default App;
