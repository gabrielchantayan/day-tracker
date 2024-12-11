import initialize from './utils/server/initialize';
import routes from './routes/index';
import express from 'express';
import cors from 'cors';
import { log } from './utils/misc/logger';

/**
 * The main entry point for the server.
 *
 * The server is initialized using the initialize utility,
 * and if initialization fails, the server is shut down.
 *
 * The server then sets up an Express.js server with
 * CORS enabled and JSON body parsing.
 *
 * The server then registers all the routes in the routes
 * object, and starts listening on the specified port.
 */
const main = async () => {
	const initialization_successful = await initialize();

	if (!initialization_successful) {
		console.error('Failed to initialize server. Shutting down.');
		return;
	}

	const server_port = 3080;
	const app = express();

	// Enable CORS for all routes.
	app.use(cors());

	// Parse JSON bodies up to 50mb.
	app.use(express.json({ limit: '50mb' }));

	// Log all incoming requests, including the body.
	app.use((request, response, next) => {
		log(`Request received from ${request.ip} for URL: ${request.url}`, 5, 'API CALLS');
		log(`Request body:\n${JSON.stringify(request.body, null, 2)}`, 5, 'API CALLS');
		next();
	});

	// Register all the routes.
	Object.entries(routes).forEach(([routeKey, routeHandler]) => {
		log(`Registering route: ${routeKey}`, 3, 'INIT');
		app.use(`/api/${routeKey}`, routeHandler);
	});

	// Start the server.
	app.listen(server_port, () => {
		log(`Server live on ${server_port}`, 0, 'INIT');
	});
}

main();