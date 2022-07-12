module.exports = {
  dryRun: false,
  ci: false,
  branch: 'master',
  plugins: [
    ['@semantic-release/commit-analyzer',{
      releaseRules: [
        {"tag": "feat", "release": "minor"},
        {"tag": "fix", "scope":"README", "release": "patch"},
        {"tag": "hot",  "release": "patch"},
        {"tag": "docs", "release": "patch"},
        {"tag": "refactor", "release": "minor"},
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
    }],
    [
      '@semantic-release/release-notes-generator',
      {
        releaseRules: [
          {"tag": "feat", "release": "minor"},
          {"tag": "fix", "scope":"README", "release": "patch"},
          {"tag": "hot",  "release": "patch"},
          {"tag": "docs", "release": "patch"},
          {"tag": "refactor", "release": "minor"},
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
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    // "@semantic-release/npm",
    [
      '@semantic-release/git',
      {
        assets:["CHANGELOG.md"],
        "message": "${nextRelease.version}"
      },
    ],
  ],
};
