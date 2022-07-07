const matchAnyEmojiWithSpaceAfter =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s/;
const matchOptionalTicketNumberWithSpaceAfter = /(?:\[[A-Z]{2,}-\\d+]\s)?/;
const subjectThatDontStartWithBracket = /([^\[].+)/;

module.exports = {
    parserPreset: {
        parserOpts: {
            headerPattern: new RegExp(
                "^" +
                matchAnyEmojiWithSpaceAfter.source +
                matchOptionalTicketNumberWithSpaceAfter.source +
                subjectThatDontStartWithBracket.source +
                "$"
            ),
            headerCorrespondence: ["emoji", "ticket", "subject"],
        },
    },
    plugins: [
        {
            rules: {
                "jira-ticket": ({ ticket }) => {
                    const pattern = new RegExp('[A-Za-z]{2,}-\\d+');
                    return [
                        pattern.test(ticket),
                        'Your ticket must be in format FTP-000'
                    ]
                },
                "header-match-team-pattern": (parsed) => {
                    const { emoji, ticket, subject } = parsed;
                    console.log(emoji, ticket, subject)
                    if (!emoji && !ticket && !subject) {
                        return [
                            false,
                            "Header must be in format '✅ [FPT-4605] some text'",
                        ];
                    }
                    return [true, ""];
                },
                "explained-emoji-enum": (parsed, _when, emojisObject) => {
                    const { emoji } = parsed;
                    if (emoji && !Object.keys(emojisObject).includes(emoji)) {
                        return [
                            false,
                            `emoji must be one of:
                            ${Object.keys(emojisObject)
                                .map((emojiType) => `${emojiType} - ${emojisObject[emojiType]}`)
                                .join("\n")}`,
                        ];
                    }
                    return [true, ""];
                },
            },
        },
    ],
    rules: {
        "header-match-team-pattern": [2, "always"],
        "explained-emoji-enum": [
            2,
            "always",
            {
                "⭐️": "New feature",
                "🛠️": "Bug fix",
                "✅": "Add, update tests",
                "🔥": "Hotfix",
                "♻️": "Refactor",
                "📝": "Documentation update",
            },
        ],
    },
};
