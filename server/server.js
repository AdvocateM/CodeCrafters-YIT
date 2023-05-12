// import http from "http";

// import app from "./app";
// import { connectDb, disconnectDb } from "./db";
// import config from "./utils/config";
// import logger from "./utils/logger";

// const server = http.createServer(app);

// server.on("listening", () => {
// 	const addr = server.address();
// 	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
// 	logger.info("listening on: %s", bind);
// });

// process.on("SIGTERM", () => server.close(() => disconnectDb()));

// connectDb().then(() => server.listen(config.port));



import http from "http";
import app from "./app";
import db from "./db";
import logger from "./utils/logger";
import config from "./utils/config";

const server = http.createServer(app);

server.on("listening", async () => {
	try {
		await db.connect();
		const addr = server.address();
		const bind =
			typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
		logger.info("listening on: %s", bind);
	} catch (err) {
		logger.error(`Error connecting to PostgreSQL database: ${err}`);
		process.exit(1);
	}
});

process.on("SIGTERM", () => {
	server.close(async () => {
		await db.disconnect();
	});
});

server.listen(config.port, () => {
	logger.info(`Server started on port ${config.port}.`);
});
