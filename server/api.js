import { Router } from "express";
import logger from "./utils/logger";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const express = require("express");
const axios = require("axios");
import db from './db'; 

const router = Router();

const JWT_SECRET = "Super Secret code....";
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "mrtamaroga@gmail.com",
		pass: "yomrrfvdsfguxtiv",
	},
});



const Users = [
	{
		id: 1,
		name: 'Advocate Maroga',
		email: 'tboymaroga7@gmail.com',
		password: 'Zxcvbnm2023',
		role: "Tutor"
	},
	{
		id: 2,
		name: 'John Due',
		email: 'johndue@gmail.com',
		password: 'Qwerty2023',
		role: "Learner"
	},
	{
		id: 3,
		name: 'Tshegofatso Maroga',
		email: 'tboymaroga@gmail.com',
		password: 'Zxcvbnm2023',
		role: "Tutor"
	},
	{
		id: 4,
		name: 'Johns Due',
		email: 'johndue@gmail.com',
		password: 'Qwerty2023',
		role: "Learner"
	}
];

// const profiles = [
// 	{
// 		id: 1,
// 		name: 'Advocate Maroga',
// 		email: 'tboymaroga7@gmail.com',
// 		password: 'Zxcvbnm2023'
// 	},
// 	{
// 		id: 2,
// 		name: 'John Due',
// 		email: 'johndue@gmail.com',
// 		password: 'Qwerty2023'
// 	}
// ];

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.post('/forgot_password', async (req, res) => {
	const email = req.body.email;

	try {
		const query = 'SELECT * FROM public.learner_profile WHERE email = $1';
		const result = await db.query(query, [email]);

		if (result.rowCount === 0) {
			return res.status(400).json({ error: 'User not found' });
		}

		const user = result.rows[0];
		const payload = { email: user.email, id: user.id };
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' });

		const mailOptions = {
			from: 'mrtamaroga@gmail.com',
			to: email,
			subject: 'Reset your password',
			html: `
        <p>Hi ${user.name},</p>
        <p>Please click the following link to reset your password:</p>
        <a href="http://localhost:3000/reset_password/${user.id}/${token}">Reset password</a>
      `,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(error);
				return res.status(500).json({ error: `Failed to send email ${email}` });
			}
			console.log('Email sent: ' + info.response);
			res.json({ message: 'Password reset link sent to your email' });
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/reset_password/:id/:token', async (req, res) => {
	const { id, token } = req.params;
	const { password } = req.body;

	try {
		const payload = jwt.verify(token, JWT_SECRET);
		if (payload.id !== parseInt(id)) {
			return res.status(400).json({ error: 'Invalid token' });
		}

		const query = 'SELECT * FROM public.users WHERE id = $1';
		const result = await db.query(query, [id]);

		if (result.rowCount === 0) {
			return res.status(400).json({ error: 'User not found' });
		}

		const user = result.rows[0];
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;

		// Update the password in the database
		const updateQuery = 'UPDATE public.users SET password = $1 WHERE id = $2';
		await db.query(updateQuery, [hashedPassword, id]);

		res.json({ message: 'Password reset successful' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Login API
router.post('/login', (req, res) => {
	const { email, password } = req.body;

	const user = Users.find(user => user.email === email);

	if (!user) {
		return res.status(400).json({ error: 'Invalid credentials' });
	}

	if (user.password !== password) {
		return res.status(400).json({ error: 'Invalid credentials' });
	}

	const payload = { id: user.id };
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' });
	res.json({ token });
});


// Admin
// Retrieve learner profiles from the database
router.get('/api/learner_profiles', async (req, res) => {
	try {
		const query = 'SELECT * FROM public.learner_profile ORDER BY created_at ASC';
		const { rows: profiles } = await pool.query(query);
		res.json(profiles);
	} catch (error) {
		console.error('Error retrieving learner profiles:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Retrieve tutor profiles from the database
router.get('/api/tutor_profiles', async (req, res) => {
	try {
		const query = 'SELECT * FROM public.tutor_profile ORDER BY created_at ASC';
		const { rows: profiles } = await pool.query(query);
		res.json(profiles);
	} catch (error) {
		console.error('Error retrieving tutor profiles:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Update learner profile in the database
router.put('/api/learner_profiles/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { name, surname, email, role } = req.body;
		const query = 'UPDATE public.learner_profile SET name = $1, surname = $2, email = $3, role = $4 WHERE id = $5';
		const values = [name, surname, email, role, id];
		await pool.query(query, values);
		res.json({ message: 'Learner profile updated successfully' });
	} catch (error) {
		console.error('Error updating learner profile:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Update tutor profile in the database
router.put('/api/tutor_profiles/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { name, surname, email, role } = req.body;
		const query = 'UPDATE public.tutor_profile SET name = $1, surname = $2, email = $3, role = $4 WHERE id = $5';
		const values = [name, surname, email, role, id];
		await pool.query(query, values);
		res.json({ message: 'Tutor profile updated successfully' });
	} catch (error) {
		console.error('Error updating tutor profile:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Delete learner profile from the database
router.delete('/api/learner_profiles/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const query = 'DELETE FROM public.learner_profile WHERE id = $1';
		const values = [id];
		await pool.query(query, values);
		res.json({ message: 'Learner profile deleted successfully' });
	} catch (error) {
		console.error('Error deleting learner profile:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Delete tutor profile from the database
router.delete('/api/tutor_profiles/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const query = 'DELETE FROM public.tutor_profile WHERE id = $1';
		const values = [id];
		await pool.query(query, values);
		res.json({ message: 'Tutor profile deleted successfully' });
	} catch (error) {
		console.error('Error deleting learner profile:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
	});


// // Define API endpoints
// router.get('/api/profiles', (req, res) => {
// 	try {
// 		const sortedProfiles = profiles
// 		res.json(sortedProfiles);
// 	} catch (error) {
// 		console.error('Error retrieving profiles:', error);
// 		res.status(500).json({ error: 'Internal server error' });
// 	}
// });


// router.put('/api/profiles/:id', (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const { name, surname, email, role } = req.body;

// 		// Find the profile by ID
// 		const profile = Users.find((p) => p.id === parseInt(id));

// 		if (!profile) {
// 			res.status(404).json({ error: 'Profile not found' });
// 			return;
// 		}

// 		// Update the profile
// 		profile.name = name;
// 		profile.surname = surname;
// 		profile.email = email;
// 		profile.role = role;

// 		res.json({ message: 'Profile updated successfully' });
// 	} catch (error) {
// 		console.error('Error updating profile:', error);
// 		res.status(500).json({ error: 'Internal server error' });
// 	}
// });


// router.delete('/api/profiles/:id', (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		// Find the index of the profile by ID
// 		const profileIndex = Users.findIndex((p) => p.id === parseInt(id));

// 		if (profileIndex === -1) {
// 			res.status(404).json({ error: 'Profile not found' });
// 			return;
// 		}

// 		// Remove the profile from the array
// 		Users.splice(profileIndex, 1);

// 		res.json({ message: 'Profile deleted successfully' });
// 	} catch (error) {
// 		console.error('Error deleting profile:', error);
// 		res.status(500).json({ error: 'Internal server error' });
// 	}
// });

//Tutor-Profile API Section

// Get tutor profile by ID
router.get("/:tutorId", async (req, res) => {
	const { tutorId } = req.params;

	try {
		const response = await axios.get(`/api/tutors/${tutorId}`
		);
		const tutor = response.data;
		res.json(tutor);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return res.status(404).json({ message: "Tutor not found" });
		}
		res.status(500).json({ message: "Internal server error" });
	}
});

// Update tutor profile
router.put("/:tutorId", async (req, res) => {
	const { tutorId } = req.params;

	try {
		const response = await axios.put(`/api/tutors/${tutorId}`,
			req.body
		);
		const updatedTutor = response.data;
		res.json(updatedTutor);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return res.status(404).json({ message: "Tutor not found" });
		}
		res.status(500).json({ message: "Internal server error" });
	}
});


// Learner Profile API Section

router.get("/:learnerId", async (req, res) => {
	const { learnerId } = req.params;
	try {
		const response = await axios.get(
			`https://api.example.com/learners/${learnerId}`
		);
		const learner = response.data;
		res.json(learner);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return res.status(404).json({ message: "Learner is not There" });
		}
		res.status(500).json({ message: "It's Server error" });
	}
});

// Update learner profile
router.put("/:learnerId", async (req, res) => {
	const { tutorId } = req.params;

	try {
		const response = await axios.put(`/api/learners/${learnerId}`,
			req.body
		);
		const updatedTutor = response.data;
		res.json(updatedLearner);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return res.status(404).json({ message: "Learner is not There" });
		}
		res.status(500).json({ message: "It's Server error" });
	}
});






export default router;
