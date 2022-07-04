module.exports = {
    extends: [
        "@commitlint/config-conventional"
    ],
    parserPreset: {
        parserOpts: {
            referenceActions: [],
            issuePrefixes: ['FPT-'],
        },
    },
}
