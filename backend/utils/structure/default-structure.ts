const default_structure = [
	{
		name: 'Meals',
		fields: [
			{
				name: 'Breakfast',
				type: 'multi-select',
			},
			{
				name: 'Lunch',
				type: 'multi-select',
			},
			{
				name: 'Dinner',
				type: 'multi-select',
			},
			{
				name: 'Snacks',
				type: 'multi-select',
			},
		],
	},
	{
		name: 'Substances',
		fields: [
			{
				name: 'Cups of Coffee Drank',
				type: 'number',
			},
			{
				name: 'Cups of Tea Drank',
				type: 'number',
			},
			{
				name: 'Drinks',
				type: 'number',
			},
		],
	},
	{
		name: 'Life',
		fields: [
			{
				name: 'Places Went',
				type: 'multi-select',
				placeholder: 'Type to add places',
				options: [
					{
						label: 'Epic Universe',
						value: 'Epic Universe',
					},
					{
						label: 'Commodity',
						value: 'Commodity',
					},
					{
						label: 'Outlook',
						value: 'Outlook',
					},
					{
						label: "Aldi's",
						value: 'Aldis',
					},
					{
						label: 'Walmart',
						value: 'Walmart',
					},
					{
						label: "Austin's Coffee",
						value: 'Austins Coffee',
					},
					{
						label: "Zach and Julia's",
						value: 'Zach and Julias',
					},
				],
			},
			{
				name: 'Productivity',
				type: 'multi-select',
			},
			{
				name: 'Excersise',
				type: 'multi-select',
			},
		],
	},
	{
		name: 'Media',
		fields: [
			{
				name: 'Books Read',
				type: 'multi-select',
			},
			{
				name: 'Movies Watched',
				type: 'multi-select',
			},
			{
				name: 'Shows Watched',
				type: 'multi-select',
			},
			{
				name: 'Games Played',
				type: 'multi-select',
			},
		],
	},
	{
		name: 'Language',
		fields: [
			{
				name: 'Duolingo Language',
				type: 'text',
			},
			{
				name: 'Duolingo Lessons',
				type: 'number',
			},
			{
				type: 'break',
			},
			{
				name: 'Mango Language',
				type: 'text',
			},
			{
				name: 'Mango Lessons',
				type: 'number',
			},
			{
				name: 'Mango Reviews',
				type: 'number',
			},
		],
	},
	{
		name: 'Emotions',
		fields: [
			{
				name: 'Happiness',
				type: 'slider',
			},
			{
				name: 'Loneliness',
				type: 'slider',
			},
			{
				name: 'Anxiety',
				type: 'slider',
			},
			{
				name: 'Anger',
				type: 'slider',
			},
			{
				name: 'Exhaustion',
				type: 'slider',
			},
			{
				name: 'Stress',
				type: 'slider',
			},
			{
				name: 'Mania',
				type: 'slider',
			},
		],
	},
	// {
	// 	name: ';)',
	// 	fields: [
	// 		{
	// 			name: 'Current Woman',
	// 			type: 'multi-select',
	// 		},
	// 		{
	// 			name: 'Ժաժ տվի',
	// 			type: 'number',
	// 		},
	// 		{
	// 			name: 'սեքս',
	// 			type: 'number',
	// 		},
	// 	],
	// },
];

export default default_structure;