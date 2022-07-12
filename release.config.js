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
      parserOpts: {
        headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
        headerCorrespondence: ["type", "ticket", "subject"],
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
        parserOpts: {
          headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
          headerCorrespondence: ["type", "ticket", "subject"],
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
        writerOpts: {
          commitsSort: [ 'ticket', 'subject' ],
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
      }
    ],
    "@semantic-release/npm",
    [
      '@semantic-release/git',
      {
        "message": "${nextRelease.version}"
      },
    ],
  ],
};
