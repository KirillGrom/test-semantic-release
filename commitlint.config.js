module.exports = {
    extends: [
        "@commitlint/config-conventional"
    ],
    rules: {
        'scope-case': [2,'always',['kebab-case','upper-case']],
        'scope-empty': [2, 'never'],
        'jira-ticket':[2,'always'],
    },
    plugins: [
        {
            rules: {
                'jira-ticket': ({ scope }) => {
                    const pattern = new RegExp('[A-Za-z]{2,}-\\d+');
                    return [
                        pattern.test(scope),
                        `Your scope should contain task number`,
                    ];
                },
            },
        },
    ],
}
