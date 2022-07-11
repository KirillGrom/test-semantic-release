module.exports = {
	parserPreset: {
		parserOpts: {
			headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
			headerCorrespondence: ["type", "ticket", "subject"],
		},
	},
	plugins: [
		{
			rules: {
				"jira-ticket": ({ ticket }) => {
					const pattern = new RegExp('[A-Z]{2,}-\\d+');
					return [
						pattern.test(ticket),
						'Your ticket must be in format FPT-000'
					]
				},
				"header-match-team-pattern": ({ type, ticket, subject }) => {
					if (!type && !ticket && !subject) {
						return [
							false,
							"Header must be in format 'Feat [FPT-4605] some text'",
						];
					}
					return [true, ""];
				},
			},
		},

	],
	rules: {
		"type-enum":[
			1,
			'always',
			['Feat', 'Fix', 'Refactor', 'Test']
		],
		"header-match-team-pattern": [2,"always"],
		"jira-ticket": [2, "always"]
	},
};
