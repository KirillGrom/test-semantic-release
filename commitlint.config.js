module.exports = {
	parserPreset: {


		parserOpts: {
			headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
			headerCorrespondence: ['type', 'ticket', 'subject'],
		},
	},
	plugins: [
		{
			rules: {
				'jira-ticket': ({ ticket }) => {
					const pattern = new RegExp('[A-Z]{2,}-\\d+');
					return [
						pattern.test(ticket),
						'Your ticket must be in format ABC-000',
					]
				},
				'header-match-team-pattern': ({ type, ticket, subject }) => {
					if (!type && !ticket && !subject) {
						return [
							false,
							'Header must be in format \'feat [ABC-000] some text\'',
						];
					}
					return [true, ''];
				},
			},
		},
	],
	rules: {
		'type-empty': [2, 'never'],
		'type-enum':[
			2,
			'always',
			['feat',
				'fix',
				'docs',
				'style',
				'refactor',
				'build',
				'chore',
				'revert'
			],
		],

		'header-match-team-pattern': [2,'always'],
		'jira-ticket': [2, 'always'],
	},
};
