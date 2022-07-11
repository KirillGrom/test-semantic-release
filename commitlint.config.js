const matchAnyEmojiWithSpaceAfter =
	/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s/;
const matchOptionalTicketNumberWithSpaceAfter = /(?:\[(.*)\]\s)?/;
const subjectThatDontStartWithBracket = /([^\[].+)/;

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
					console.log(type, ticket, subject)
					if (!type && !ticket && !subject) {
						return [
							false,
							"Header must be in format '✅ [FPT-4605] some text'",
						];
					}
					return [true, ""];
				},
			},
		},

	],
	rules: {
		"jira-ticket": [2, "always"]
	},
};
