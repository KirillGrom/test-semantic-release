module.exports = {
    extends: [
        "@commitlint/config-conventional"
    ],
    'rules': {
        'references-empty': [2, 'never'],
        'type-empty': 'always',
    },
    parserPreset: {
        parserOpts: {
            issuePrefixes: ['PROJ-']
        }
    },
}
