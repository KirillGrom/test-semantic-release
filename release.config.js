module.exports = {
  dryRun: false,
  branch: 'master',
  plugins: [
    ['@semantic-release/commit-analyzer',{
      "releaseRules": [
        {"type": "Fix", "scope":"README", "release": "patch"},
        {"type": "Feat", "release": "minor"},
      ],
      parserOpts: {
        headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
        headerCorrespondence: ["type", "ticket", "subject"],
        noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
      },
    }],
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git',
      {
        "assets": ["CHANGELOG.md"],
      },
    ],
  ],
  "preset": 'angular',
};
