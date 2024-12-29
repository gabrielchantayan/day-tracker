import { find_one, insert, update } from '../db/db';
import { log } from '../misc/logger';
import success_handler from '../misc/success-handler';
import { deep_merge } from '../misc/utils';


/*
{
  "_id": {
    "$oid": "677077eabc5428150dd6333d"
  },
  "user": "me@gabrielchantayan.com",
  "data": {
    "Breakfast": [
      {
        "value": "Coconut Greek Yogurt",
        "label": "Coconut Greek Yogurt"
      },
      {
        "value": "Chick-n-minis",
        "label": "Chick-n-minis"
      },
      {
        "value": "Granola Parfait",
        "label": "Granola Parfait"
      },
      {
        "value": "Red Bean Pastry",
        "label": "Red Bean Pastry"
      }
    ],
    "Lunch": [
      {
        "value": "Beerwurst",
        "label": "Beerwurst"
      },
      {
        "value": "Cabbage Salad",
        "label": "Cabbage Salad"
      },
      {
        "value": "Sauerkraut",
        "label": "Sauerkraut"
      },
      {
        "value": "Pepperoni Pizza",
        "label": "Pepperoni Pizza"
      },
      {
        "value": "Cheese Pizza",
        "label": "Cheese Pizza"
      },
      {
        "value": "Ribs",
        "label": "Ribs"
      },
      {
        "value": "Lobov Salat",
        "label": "Lobov Salat"
      },
      {
        "value": "Burek",
        "label": "Burek"
      },
      {
        "value": "Salad",
        "label": "Salad"
      },
      {
        "value": "Sweet Potato Casserole",
        "label": "Sweet Potato Casserole"
      },
      {
        "value": "Trader Joe's Orange Chicken",
        "label": "Trader Joe's Orange Chicken"
      },
      {
        "value": "Tacos Al Pastor",
        "label": "Tacos Al Pastor"
      },
      {
        "value": "Coconut Pastry",
        "label": "Coconut Pastry"
      },
      {
        "value": "Chocolate Chip Muffin",
        "label": "Chocolate Chip Muffin"
      },
      {
        "value": "Pringles",
        "label": "Pringles"
      },
      {
        "value": "Beef Bulgogi Mandu",
        "label": "Beef Bulgogi Mandu"
      },
      {
        "value": "Jimmy John's Spicy Italian",
        "label": "Jimmy John's Spicy Italian"
      },
      {
        "value": "Gyro Pizza",
        "label": "Gyro Pizza"
      },
      {
        "value": "Fattoush",
        "label": "Fattoush"
      },
      {
        "value": "Beef Kufta",
        "label": "Beef Kufta"
      },
      {
        "value": "Beef Kebab",
        "label": "Beef Kebab"
      },
      {
        "value": "Chickrn Kebab",
        "label": "Chickrn Kebab"
      },
      {
        "value": "Hummus",
        "label": "Hummus"
      },
      {
        "value": "Toum",
        "label": "Toum"
      },
      {
        "value": "Rice Pilaf",
        "label": "Rice Pilaf"
      },
      {
        "value": "Lavash",
        "label": "Lavash"
      }
    ],
    "Dinner": [
      {
        "value": "Beerwurst",
        "label": "Beerwurst"
      },
      {
        "value": "Corn",
        "label": "Corn"
      },
      {
        "value": "Green Beans",
        "label": "Green Beans"
      },
      {
        "value": "Sauerkraut",
        "label": "Sauerkraut"
      },
      {
        "value": "Duck Bao Bun",
        "label": "Duck Bao Bun"
      },
      {
        "value": "Spring Rolls",
        "label": "Spring Rolls"
      },
      {
        "value": "Ribs",
        "label": "Ribs"
      },
      {
        "value": "Beef Bulgogi Mandu",
        "label": "Beef Bulgogi Mandu"
      },
      {
        "value": "Vegetable Lo Mein",
        "label": "Vegetable Lo Mein"
      },
      {
        "value": "Sweet and Sour Chicken",
        "label": "Sweet and Sour Chicken"
      },
      {
        "value": "Egg Rolls",
        "label": "Egg Rolls"
      },
      {
        "value": "Fried Dumplings",
        "label": "Fried Dumplings"
      },
      {
        "value": "Wonton Soup",
        "label": "Wonton Soup"
      },
      {
        "value": "Trader Joe's Orange Chicken",
        "label": "Trader Joe's Orange Chicken"
      },
      {
        "value": "Chicken Adana Kebap",
        "label": "Chicken Adana Kebap"
      },
      {
        "value": "Rice",
        "label": "Rice"
      },
      {
        "value": "Sumac Onions",
        "label": "Sumac Onions"
      },
      {
        "value": "Kebab Shop Salad",
        "label": "Kebab Shop Salad"
      },
      {
        "value": "Carrots",
        "label": "Carrots"
      },
      {
        "value": "Mushroom & Black Truffle Flatbread",
        "label": "Mushroom & Black Truffle Flatbread"
      },
      {
        "value": "Beef Bourguignon",
        "label": "Beef Bourguignon"
      }
    ],
    "Snacks": [
      {
        "value": "Pomegranate Dark Chocolate",
        "label": "Pomegranate Dark Chocolate"
      },
      {
        "value": "Pistachios",
        "label": "Pistachios"
      },
      {
        "value": "Almonds",
        "label": "Almonds"
      },
      {
        "value": "Raspberries",
        "label": "Raspberries"
      },
      {
        "value": "Napoleon",
        "label": "Napoleon"
      },
      {
        "value": "Baklava",
        "label": "Baklava"
      },
      {
        "value": "Chocolate Pecans",
        "label": "Chocolate Pecans"
      },
      {
        "value": "Andes Candy",
        "label": "Andes Candy"
      },
      {
        "value": "Manzanilla Olives",
        "label": "Manzanilla Olives"
      },
      {
        "value": "Cornichons",
        "label": "Cornichons"
      },
      {
        "value": "Skittles",
        "label": "Skittles"
      },
      {
        "value": "Kunefe",
        "label": "Kunefe"
      },
      {
        "value": "Chianti Red Wine Salami",
        "label": "Chianti Red Wine Salami"
      },
      {
        "value": "Pomegranate Seeds",
        "label": "Pomegranate Seeds"
      },
      {
        "value": "Lemonade",
        "label": "Lemonade"
      },
      {
        "value": "Chips and Salsa",
        "label": "Chips and Salsa"
      }
    ],
    "Places Went": [
      {
        "label": "Aldi's",
        "value": "Aldis"
      },
      {
        "label": "Commodity",
        "value": "Commodity"
      },
      {
        "value": "Zymarium",
        "label": "Zymarium"
      },
      {
        "value": "Tori Tori",
        "label": "Tori Tori"
      },
      {
        "value": "Hawker's",
        "label": "Hawker's"
      },
      {
        "value": "The Guest House",
        "label": "The Guest House"
      },
      {
        "value": "The Sunroom",
        "label": "The Sunroom"
      },
      {
        "value": "Moderne",
        "label": "Moderne"
      },
      {
        "label": "Austin's Coffee",
        "value": "Austins Coffee"
      },
      {
        "value": "Fiddler's Green",
        "label": "Fiddler's Green"
      },
      {
        "value": "The Porch",
        "label": "The Porch"
      },
      {
        "value": "Parents' House",
        "label": "Parents' House"
      },
      {
        "value": "Grandparents' House",
        "label": "Grandparents' House"
      },
      {
        "value": "Wawa",
        "label": "Wawa"
      },
      {
        "value": "Fort Pierce Rest Stop",
        "label": "Fort Pierce Rest Stop"
      },
      {
        "value": "Soorp Haroutiun Armenian Church",
        "label": "Soorp Haroutiun Armenian Church"
      },
      {
        "value": "Lake Nona Center",
        "label": "Lake Nona Center"
      },
      {
        "value": "Boxi Park",
        "label": "Boxi Park"
      },
      {
        "value": "Bosphorous",
        "label": "Bosphorous"
      },
      {
        "value": "Croissant Gourmet",
        "label": "Croissant Gourmet"
      },
      {
        "value": "Panera Bread",
        "label": "Panera Bread"
      },
      {
        "value": "Rollins College",
        "label": "Rollins College"
      },
      {
        "value": "Trader Joe's",
        "label": "Trader Joe's"
      },
      {
        "value": "Target",
        "label": "Target"
      },
      {
        "value": "TJ Maxx",
        "label": "TJ Maxx"
      },
      {
        "value": "Five Below",
        "label": "Five Below"
      },
      {
        "value": "Bath and Body Works",
        "label": "Bath and Body Works"
      },
      {
        "value": "Victoria's Secret",
        "label": "Victoria's Secret"
      },
      {
        "value": "Party City",
        "label": "Party City"
      },
      {
        "value": "Vaani's Place",
        "label": "Vaani's Place"
      },
      {
        "label": "Epic Universe",
        "value": "Epic Universe"
      },
      {
        "value": "Stardust",
        "label": "Stardust"
      },
      {
        "value": "Mayumi's House",
        "label": "Mayumi's House"
      },
      {
        "value": "Ikea",
        "label": "Ikea"
      }
    ],
    "Productivity": [
      {
        "value": "Programming",
        "label": "Programming"
      },
      {
        "value": "SAT Reports",
        "label": "SAT Reports"
      },
      {
        "value": "Vaccum House",
        "label": "Vaccum House"
      },
      {
        "value": "Vaccum entire house",
        "label": "Vaccum entire house"
      },
      {
        "value": "Mop entire house",
        "label": "Mop entire house"
      },
      {
        "value": "Deploy Day Tracker App",
        "label": "Deploy Day Tracker App"
      },
      {
        "value": "SATs",
        "label": "SATs"
      },
      {
        "value": "Moving bookmarks to Hoarder",
        "label": "Moving bookmarks to Hoarder"
      },
      {
        "value": "Set up Hoarder",
        "label": "Set up Hoarder"
      },
      {
        "value": "Laundry",
        "label": "Laundry"
      },
      {
        "value": "Set up HomeBridge",
        "label": "Set up HomeBridge"
      }
    ],
    "Excersise": [
      {
        "value": "Jogged",
        "label": "Jogged"
      }
    ],
    "Books Read": [
      {
        "value": "Anna Karenina",
        "label": "Anna Karenina"
      }
    ],
    "Movies Watched": [
      {
        "value": "La La Land",
        "label": "La La Land"
      },
      {
        "value": "Chef",
        "label": "Chef"
      },
      {
        "value": "Monkey Man",
        "label": "Monkey Man"
      },
      {
        "value": "Reality Bites",
        "label": "Reality Bites"
      },
      {
        "value": "Մեր մանկության տանգոն",
        "label": "Մեր մանկության տանգոն"
      }
    ],
    "Shows Watched": [
      {
        "value": "House",
        "label": "House"
      },
      {
        "value": "Dandadan",
        "label": "Dandadan"
      }
    ],
    "Games Played": [],
    "Current Woman": []
  }
}
*/

const sort_prefill = (prefill) => {
	
	return prefill.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));

}

export const update_data = async ({ user, date, data }) => {

	// Check if days exist
	const db_day = await find_one('days', { user: user, date: date });
	if (!db_day) insert('days', { user: user, date: date, data: data });
	else update('days', { user: user, date: date }, { data: data });

	const db_prefill = await find_one('prefill', { user: user });
	if (!db_prefill) {
		let prefill = {};

		for (const [key, values] of Object.entries(data)) {
			if (Array.isArray(values)) {
				prefill[key] = values;
			}
		}

		insert('prefill', { user: user, data: prefill });
	} else {
		try {
			let flattened_prefill = {};
			for (const [key, values] of Object.entries(db_prefill.data)) {
				if (Array.isArray(values)) {
					flattened_prefill[key] = values;
				}
			}

			for (const [key, values] of Object.entries(data)) {
				// If the values are not an array, skip
				if (!Array.isArray(values)) continue;

				// If the first value is not an object, skip
				if (typeof values[0] !== 'object') continue;

				if (!flattened_prefill.hasOwnProperty(key)) flattened_prefill[key] = [];
				flattened_prefill[key] = [...flattened_prefill[key], ...[...new Set(values as any)]];
			}

			// Iterate through flattened prefill
			for (let [key, values] of Object.entries(flattened_prefill)) {
				// Remove any null, undefined
				flattened_prefill[key] = [
					...new Set(
						(values as any).filter(
							(value) => value !== null && value !== undefined && JSON.stringify(value) !== '{}'
						)
					),
				];

				// Remove duplicate values
				// The values are objects
				flattened_prefill[key] = [...new Set(flattened_prefill[key].map((value) => JSON.stringify(value)))].map(
					(value) => JSON.parse(value as any)
				);

				// Sort the values
				flattened_prefill[key] = sort_prefill(flattened_prefill[key]);
			}

			log(JSON.stringify(flattened_prefill, null, 2), 5);

			update('prefill', { user: user }, { data: flattened_prefill });
		} catch (e) {
			log(e, 3);
			return success_handler(false, null, 'error.data.could-not-update');
		}
	}

	return success_handler(true, null, 'data.updated');
};

export const get_data = async ({ user, token, date }) => {
	const db_day = await find_one('days', { user: user, date: date });
	if (!db_day) return success_handler(false, null, 'error.data.not-found');
	return success_handler(true, { data: db_day.data }, 'data.found');
};


export const get_prefill = async ({ user }) => {
    const db_prefill = await find_one('prefill', { user: user });
    if (!db_prefill) return success_handler(false, null, 'error.prefill.not-found');
    return success_handler(true, { data: db_prefill.data }, 'prefill.found');
};