const express = require("express");
import { Router } from "express";
import pool from "../db";
require("dotenv").config();
const router = express.Router();

// Get all learners
router.get("/learner_profile", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM learner_profile");
		res.json(rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// Get learner profile by ID
router.get("/learner_profile/:learnerId", async (req, res) => {
	const { learnerId } = req.params;

	try {
		const { rows } = await pool.query(
			"SELECT * FROM learner_profile WHERE learner_id = $1",
			[learnerId]
		);
		const learner = rows[0];
		if (!learner) {
			return res.status(404).json({ message: "Learner not found" });
		}
		res.json(learner);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// Update learner profile
router.put("/learner_profile/:learnerId", async (req, res) => {
	const { learnerId } = req.params;
	const updatedLearner = req.body;

	try {
		const fields = Object.keys(updatedLearner);
		const values = Object.values(updatedLearner);
		const sets = fields
			.map((field, index) => `${field} = $${index + 1}`)
			.join(", ");
		const query = `UPDATE learner_profile SET ${sets} WHERE learner_id = $${
			fields.length + 1
		} RETURNING *`;
		const params = [...values, learnerId];
		const { rows } = await pool.query(query, params);
		const tutor = rows[0];
		if (!learner) {
			return res.status(404).json({ message: "Learner is not found" });
		}
		res.json(learner);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;

