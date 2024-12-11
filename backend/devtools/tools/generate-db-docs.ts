import { readFile, writeFile } from 'fs/promises';

async function main(): Promise<void> {
	// Read the apiRoutes.json file
	const db_docs = JSON.parse(await readFile('./devtools/editables/collections.json', 'utf-8'));

	// Sort db_docs by key
	const sorted_db_docs = Object.fromEntries(Object.entries(db_docs).sort((a, b) => a[0].localeCompare(b[0])));

	const seperator = '\n\n---\n\n';

	// Empty docs variable
	let docs = '# Database Documentation\n\n';

	for (const [collection, collection_data] of Object.entries(db_docs)) {


		// Add a header for the category
		docs += `<details><summary><code><b>${collection}</b></code> <code>${collection_data['description']}</code></summary>\n\n`;

		docs += `#### ${collection_data['name']}\n\n`;

		docs += `##### Fields\n\n| Name | Required | Data Type | Description |\n|---|---|---|---|\n`;

		for (const [field, field_data] of Object.entries(collection_data['data-structure'])) {

			docs += `| ${field} | ${field_data['required']} | ${field_data['type']} | ${field_data['description']} |\n`;

		}


		docs += `</details>\n\n`;

	}

	// Write to docs.md
	await writeFile('./docs/DB-DOCUMENTATION.md', docs);
}

main();

