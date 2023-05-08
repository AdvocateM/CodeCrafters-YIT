import express from "express";
const cors = require("cors");
const nodemailer = require('nodemailer');
import apiRouter from "./api";
import config from "./utils/config";
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware";

const apiRoot = "/api";

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());
app.use(cors());

// Create transporter object for nodemailer
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "mrtamaroga@gmail.com",
		pass: "yomrrfvdsfguxtiv",
	},
});

// Forget password Dependencies
// Pass transporter object to API routes
app.use((req, res, next) => {
	req.transporter = transporter;
	next();
});
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'enjs')

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

// app.use("/health", (_, res) => res.sendStatus(200));   // I did comment this out because  is looking the static directory to hit the /health endpoint
app.use(apiRoot, apiRouter);
app.use(clientRouter(apiRoot));
app.use(logErrors());

export default app;
