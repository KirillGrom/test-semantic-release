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
        headerCorrespondence: ["header"],
      },
      writerOpts: {
        commitsSort: [ 'ticket', 'subject' ],
        noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        rules: {
          "type-enum":[
            1,
            'always',
            ['Feat', 'Fix', 'Refactor', 'Test']
          ],
        }
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
          rules: {
            "type-enum":[
              1,
              'always',
              ['Feat', 'Fix', 'Refactor', 'Test']
            ],
          }
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
