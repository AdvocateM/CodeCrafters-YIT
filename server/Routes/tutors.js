const express = require("express");
import { Router } from "express";

import pool from "../db";
require("dotenv").config();

const router = express.Router();

// Get all tutors
router.get("/tutor_profile", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM tutor_profile");
		res.json(rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// Get tutor profile by ID
router.get("/tutor_profile/:tutorId", async (req, res) => {
	const { tutorId } = req.params;

	try {
		const { rows } = await pool.query(
			"SELECT * FROM tutor_profile WHERE tutor_id = $1",
			[tutorId]
		);
		const tutor = rows[0];
		if (!tutor) {
			return res.status(404).json({ message: "Tutor not found" });
		}
		res.json(tutor);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// Update tutor profile
router.put("/tutor_profile/:tutorId", async (req, res) => {
	const { tutorId } = req.params;
	const updatedTutor = req.body;

	try {
		const fields = Object.keys(updatedTutor);
		const values = Object.values(updatedTutor);
		const sets = fields
			.map((field, index) => `${field} = $${index + 1}`)
			.join(", ");
		const query = `UPDATE tutor_profile SET ${sets} WHERE tutor_id = $${
			fields.length + 1
		} RETURNING *`;
		const params = [...values, tutorId];
		const { rows } = await pool.query(query, params);
		const tutor = rows[0];
		if (!tutor) {
			return res.status(404).json({ message: "Tutor not found" });
		}
		res.json(tutor);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
