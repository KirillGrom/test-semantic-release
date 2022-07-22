module.exports = {
  dryRun: false,
  ci: false,
  branch: 'master',
  plugins: [
    ['@semantic-release/commit-analyzer',{
      releaseRules: [
        {"type": "feat", "release": "minor"},
        {"type": "fix", "scope":"README", "release": "patch"},
        {"type": "hot",  "release": "patch"},
        {"type": "docs", "release": "patch"},
        {"type": "refactor", "release": "minor"},
        {"type": "smallFix", "release":"patch"}
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
        presetConfig: {
          types: [
            {
              tag:'smallFix',
              section: ":sparkles: smallFix",
            },
          ],
        },
        parserOpts: {
          headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
          headerCorrespondence: ["type", "ticket", "subject"],
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
        writerOpts: {
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
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
    [
      '@semantic-release/git',
      {
        assets:[
          "CHANGELOG.md",
          "package.json",
          "package-lock.json"
        ],

        message: "${nextRelease.version}"
      },
    ],
  ],
};
