import * as fs from 'fs/promises';

export const flattenLocale = (locale: any, prefix = ''): any => {

    console.log(`Flattening ${prefix}`);

	const newLocale: any = {};
	for (const key in locale) {
		if (locale[key] && typeof locale[key] === 'object') {
			Object.assign(newLocale, flattenLocale(locale[key], prefix + key + '.'));
		} else {
			newLocale[prefix + key] = locale[key];
		}
	}

	return newLocale;
};

const sort_locale = (locale: any): any => {
	// Sort locale in the following order:
	// All items are sorted alphabetically
	// All objects are sorted alphabetically
	// Items that are not an object go on top
	// Items that are an object go after
	// 'error' goes at the end

	const sorted = Object.fromEntries(
		Object.entries(locale).sort((a, b) => {
			if (a[0] === 'error' || a[0] === 'entries') {
				return 1;
			}
			else if (b[0] === 'error' || a[0] === 'entries') {
				return -1;
			} else if (typeof a[1] === 'string' && typeof b[1] === 'string') {
				return a[0].localeCompare(b[0]);
			} else if (typeof a[1] === 'object' && typeof b[1] === 'object') {
				return a[0].localeCompare(b[0]);
			} else if (typeof a[1] === 'string' && typeof b[1] === 'object') {
				return -1;
			} else if (typeof a[1] === 'object' && typeof b[1] === 'string') {
				return 1;
			} else {
				return 0;
			}
		})
	);

	// // Add 'error' to the end
	// sorted = Object.fromEntries({ ...sorted, ...{
	// 	error: {
	// 		...sorted.error,
	// 		...sorted.error?.error
	// 	}
	// }})

	return Object.fromEntries(
		Object.entries(sorted).map(([key, value]) => {
			if (typeof value === 'object') {
				return [key, sort_locale(value)];
			} else {
				return [key, value];
			}
		})
	);
};


const main = async () => {
	let localeList = await fs.readdir('localization/locales');
	let localeData = {};
	let flattenedLocale = { info: { locales: {} } };
    let fallbackOrder = [];
	let localeFallbacks = {};
	let localeItems = {};

	let diff_report = '# Locale missing items report\n';

	/**
	 * Recursively get all fallbacks for a given locale
	 * @param {string} locale What locale to check fallbacks for
	 * @param {Array<string>} fallbackList On init, an empty array of fallbcks. Gets added to recursivley
	 * @returns {Array<string>} List of fallbacks
	 */
	const getFallbackLocales = (locale, fallbackList) => {
		// Check if the locale has any fallbacks
		if (localeData[locale]['info'].hasOwnProperty('fallbacks')) {
			// If so, then iterate through each fallback
			for (let fbLocale of localeData[locale]['info']['fallbacks']) {
				fallbackList.unshift(fbLocale);
				getFallbackLocales(fbLocale, fallbackList);
			}
		}

		return fallbackList;
	};

	/**
	 * Fills the gaps of a locale with its fallback text.
	 * @param {string} locale The locale to fill gaps in
	 */
	const fillGaps = (locale) => {
		flattenedLocale[locale] = localeData[locale]['entries'];

		// Check if the locale has any fallbacks
		if (localeData[locale]['info'].hasOwnProperty('fallbacks')) {
			// If it does, then iterate through every fallback in the list
			// We want to reverse the list in the event that multiple fallbacks
			// have the same string. We want the fallbacks higher up the list
			// to take priority, and I don't want to do a check for every
			// single string to make sure it didn't get filled in.
			for (let fallback of localeData[locale]['info']['fallbacks'].reverse()) {
				// Get what items the fallback has that the locale doesn't
				let difference = localeItems[fallback].filter((x) => !localeItems[locale].includes(x));

				// Iterate through every string that's different
				for (let string of difference) {
					// Add it to the locale
					flattenedLocale[locale][string] = localeData[fallback]['entries'][string];
				}
			}
		}
	};

	// Remove '.json' from each name in the locale list
	localeList = localeList.map((x) => x.slice(0, -5));

	// Log what locales have been found
	console.log(`Found ${localeList.length} locales:`);
	console.log(localeList);

	// Iterate through each locale
	for (let defaultLocale of localeList) {
		// Read the locale file
		let localePath = `localization/locales/${defaultLocale}.json`;

		// Add it to the locale data
		let localeFile = await fs.readFile(localePath, 'utf8');
        
        // Parse it
        localeData[defaultLocale] = JSON.parse(localeFile);

		// Sort it
		localeData[defaultLocale] = sort_locale(localeData[defaultLocale]);

		// Write the sorted locale
		await fs.writeFile(
			`localization/locales/${defaultLocale}.json`,
			JSON.stringify(localeData[defaultLocale], null, 4)
		);

        // Flatten "entries" using flattenLocale()
        localeData[defaultLocale].entries = flattenLocale(localeData[defaultLocale].entries, '');

        console.log(`New default locale: ${JSON.stringify(localeData[defaultLocale])}`);


		// Add it to the flattened locale info
		flattenedLocale.info.locales[defaultLocale] = localeData[defaultLocale]['info']['name'];
	}

	// Iterate through each locale
	// Get all fallbacks for the wanted locale
	// then get all fallbacks for those fallbacks
	// then get all fallbacks for those fallbacks
	// etc.
	// Remove duplicates using [... new Set(...)]
	for (const locale of Object.keys(localeData)) {


        let fallbacks = getFallbackLocales(locale, []);

		localeFallbacks[locale] = [...new Set(fallbacks)];
        fallbackOrder.push(... fallbacks, locale);
	}

    fallbackOrder = [...new Set(fallbackOrder)];

    console.log(`Locale fallback order: ${fallbackOrder.join(', ')}`);


    // Iterate through each locale
    for (const locale of fallbackOrder) {
        fillGaps(locale);
    }


	// Write each flattened locale to a file
	for (const locale of Object.keys(flattenedLocale.info.locales)) {
		fs.writeFile(`localization/flattened-locales/${locale}.json`, JSON.stringify(flattenedLocale[locale], null, 2));

		// Skip if the locale is 'en-US'
		if (locale === 'en-US') continue;

		let missing_string_count = 0;
		let missing_strings = [];

		for (const key in flattenedLocale['en-US'] ){

			if (flattenedLocale[locale][key] === undefined) {
				missing_string_count++;
				missing_strings.push(`\`${key}\`: ${flattenedLocale['en-US'][key]}`);
			}
		}

		if (missing_string_count > 0) {
			diff_report += `<details><summary><code><b>${locale}</b></code> is missing ${missing_string_count} strings. (${(((Object.keys(flattenedLocale['en-US']).length - missing_string_count) / Object.keys(flattenedLocale['en-US']).length) * 100).toFixed(2)}% coverage)</summary>\n\n${missing_strings.join('\n\n')}\n</details>\n\n`;
		}
		else {
			diff_report += `<details><summary><code><b>${locale}</b></code> has no missing strings (100% coverage)</summary></details>\n\n`;
		}

	}
	
	fs.writeFile(`docs/LOCALIZATION-DIFF.md`, diff_report);
	
	





    // Write the flattened locale file
    await fs.writeFile('client/src/assets/locale.json', JSON.stringify(flattenedLocale, null, 2));

    console.log('Done!');

};

main();
