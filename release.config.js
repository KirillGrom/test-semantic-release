module.exports = {
  dryRun: false,
  ci: false,
  branch: 'master',
  plugins: [
    ['@semantic-release/commit-analyzer',{
      releaseRules: [
        {"type": "Fix", "scope":"README", "release": "patch"},
        {"type": "Feat", "release": "minor"},
      ],
      config: {
        headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
        headerCorrespondence: ["type", "ticket", "subject"],
      },
      parserOpts: {
        noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
      },
    }],
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        releaseRules: [
          {"type": "Fix", "scope":"README", "release": "patch"},
          {"type": "Feat", "release": "minor"},
        ],
        config: {
          parserOpts: {
            headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
            headerCorrespondence: ["type", "ticket", "subject"],
          },
        },
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
        },
      }
    ],
    [
      '@semantic-release/git',
      {
        "assets": ["CHANGELOG.md"],
      },
    ],
  ],
};
