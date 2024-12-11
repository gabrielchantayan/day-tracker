import { readFile, writeFile } from 'fs/promises';

async function main(): Promise<void> {
	// Read the apiRoutes.json file
	const api_routes = JSON.parse(await readFile('./devtools/editables/api-routes.json', 'utf-8')) as Record<string, Record<string, {
		name: string;
		description: string;
		type: string;
		"primary-function-file": string;
		"primary-function": string;
		"endpoint"?: string;
		"post-fields"?: Record<string, string>;
	}>>;

	const seperator = '\n\n---\n\n';

	// Sort api_routes by key
	const sorted_api_routes = Object.fromEntries(Object.entries(api_routes).sort((a, b) => a[0].localeCompare(b[0])));

	// Empty docs variable
	let docs = '# API Documentation\n\n';

	for (const [category, category_data] of Object.entries(sorted_api_routes)) {
		// Add a header for the category
		docs += seperator + `#### ${category.toUpperCase()}\n\n`;

		// Iterate through categoryData
		for (const [route, route_data] of Object.entries(category_data)) {
			// Add a header for the route
			docs += `<details>
<summary><code>${route_data['type']}</code> <code><b>/api/${category}/${route}</b></code> <code>${route_data['description']}</code></summary>\n\n`;

			// Iterate through each post field
			if (route_data['parameters']) {
				docs += `##### Parameters\n> | Name | Required | Data Type | Description |\n> |---|---|---|---|\n`;

				for (const [param_name, param_data] of Object.entries(route_data['parameters'])) {
					docs += `> | ${param_name} | ${param_data['required']} | ${param_data['type']} | ${param_data['description']} | \n`;
				}
			}

			// Iterate through each post field
			if (route_data['responses']) {
				docs += `\n\n##### Responses\n\n> | Name | Success | Description | Data | Message | \n> |---|---|---|---|---|\n`;

				for (const [res_name, res_data] of Object.entries(route_data['responses'])) {
					docs += `> | ${res_name} | ${res_data['success']} | ${res_data['description']} | ${JSON.stringify(
						res_data['data']
					)} | ${res_data['message']} | \n`;
				}
			}

			docs += `\n</details>\n\n`;
		}
	}

	// Write to docs.md
	await writeFile('./docs/API-DOCUMENTATION.md', docs);
}

main();

