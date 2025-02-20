import { readFile, writeFile, readdir, mkdir, unlink } from 'fs/promises';

const check_and_create_dir = async (directory: string): Promise<void> => {
	let dirExists = false;

	try {
		await readdir(directory);
		dirExists = true;
	} catch (error) {
		dirExists = false;
	}

	if (!dirExists) {
		try {
			await mkdir(directory, { recursive: true });
		} catch (error) {
			console.log(error.message);
		}
	}
};

const main = async (): Promise<void> => {
	// Read the API Routes file and parse the JSON
	const routes_file_raw = await readFile('./devtools/editables/api-routes.json', 'utf8');
	const routes_file = JSON.parse(routes_file_raw) as Record<string, Record<string, {
		"name": string;
		"description": string;
		"type": string;
		"primary-function-file": string;
		"primary-function": string;
		"endpoint"?: string;
	}>>;

	await check_and_create_dir('./controllers');
	await check_and_create_dir('./routes');

	const route_list: string[] = [];

	// Iterate through each route
	for (const [route, endpoints] of Object.entries(routes_file)) {
		// Push the route name to levelOne
		route_list.push(route);

		// Create an empty array for the endpoints of the current route
		const current_route_endpoints: string[] = [];

		await check_and_create_dir(`./controllers/${route}`);

		// Iterate through each endpoint
		for (const [endpoint, data] of Object.entries(endpoints)) {
			// Push the endpoint name to the current route endpoints
			current_route_endpoints.push(endpoint);

			// Generate the controller file
			await generate_controller_file(route, endpoint, data);
		}

		// Delete any filex that arent in route_list
		const controller_files = await readdir(`./controllers/${route}`);
		for (const file of controller_files) {
			if (!current_route_endpoints.includes(file.replace(/\.ts$/, ''))) {
				await unlink(`./controllers/${route}/${file}`);
			}
		}

		// Generate the controller index file
		await generate_controller_index_file(route, Object.keys(endpoints));

		// Generate the route file
		await generate_route_file(route, endpoints);
	}

	// Generate the route index file
	await generate_route_index_file(Object.keys(routes_file));

	// Delete any filex that arent in route_list
	const files = await readdir('./routes');
	for (const file of files) {
		if (!route_list.includes(file.replace(/\.ts$/, '')) && file !== 'index.ts') {
			await unlink(`./routes/${file}`);
		}
	}
};

/**
 * Generate an endpoint's controller file
 * @param {String} route The route to put the file under
 * @param {String} endpoint The endpoint
 * @param {Object} data The endpoint's data as specified in apiRoutes.json
 */
const generate_controller_file = async (route: string, endpoint: string, data: {
	"name": string;
	"description": string;
	"type": string;
	"primary-function-file": string;
	"primary-function": string;
	"endpoint"?: string;
}): Promise<void> => {
	// The file


	const file = `import async_wrapper from '../../middleware/async-wrapper';
import { ${data['primary-function']} as main_function } from '../../${data['primary-function-file'].replace(/\.ts$/, '')}';

// ${data.name}
// ${data.description}
const ${endpoint.replace(/-/g, '_')} = async_wrapper(async (req, res) => {

    const ret = await main_function(${(data['need-whole-req'] ? 'req' : '{...req.body}')});

    res.status(200).json(ret);

});

export default ${endpoint.replace(/-/g, '_')};
`;

	// Write the file
	await writeFile(`./controllers/${route}/${endpoint}.ts`, file);
	console.log(`Wrote ./controllers/${route}/${endpoint}.ts`);
};

/**
 * Create the controller index file for a route
 * @param {String} route The route to save the file to
 * @param {Array} endpoints Array of each endpoint
 */
const generate_controller_index_file = async (route: string, endpoints: string[]): Promise<void> => {
	// Create empty file
	let file = '';

	// Map every endpoint to an import
	file += endpoints
		.map((e) => {
			return `import ${e.replace(/-/g, '_')} from './${e}';`;
		})
		.join('\n');

	// Add the default export
	file += `\n\nexport default {
\t${endpoints.join(',\n\t').replace(/-/g, '_')}
};
`;

	// Write the file
	await writeFile(`./controllers/${route}/index.ts`, file);
	
};

/**
 * Generate a route's file
 * @param {String} route The route to save the endpoints under
 * @param {Object} endpoints The endpoint object for the given route
 */
const generate_route_file = async (route: string, endpoints: Record<string, {
	"name": string;
	"description": string;
	"type": string;
	"primary-function-file": string;
	"primary-function": string;
	"endpoint"?: string;
}>): Promise<void> => {
	let file = `import { Router } from 'express';
const router = Router();

import ${route} from '../controllers/${route}/index';
`;

	for (const [endpoint, data] of Object.entries(endpoints)) {
		file += `
// ${data.name}
// ${data.description}
router.${data.type.toLowerCase()}('/${
			data.hasOwnProperty('endpoint') ? data.endpoint : endpoint
		}', (req, res) => {
    return ${route.replace(/-/g, '_')}.${endpoint.replace(/-/g, '_')}(req, res);
});
`;
	}

	file += 'export default router;';

	// Write the file
	await writeFile(`./routes/${route}.ts`, file);
};

/**
 * Create an index file from the given routes
 * @param {Array} routes All the routes
 */
const generate_route_index_file = async (routes: string[]): Promise<void> => {
	// Create empty file
	let file = '';

	// Map every route to an import
	file += routes
		.map((e) => {
			return `import ${e.replace(/-/g, '_')} from './${e}';`;
		})
		.join('\n');

	// Add the default export
	file += `\n\nexport default {
\t${routes.join(',\n\t').replace(/-/g, '_')}
};
`;

	/// Write the file
	await writeFile(`./routes/index.ts`, file);
};

main();

