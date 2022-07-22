module.exports = {
  dryRun: false,
  ci: false,
  branch: 'master',
  plugins: [
    ['@semantic-release/commit-analyzer',{
      releaseRules: [
        {type: "feat", release: "minor"},
        {type: "fix", release: "patch"},
        {type: "refactor", release: "minor"},
        {type: "docs", release: "patch"},
        {type: "build", release: "patch"},
        {type: "chore", release: "patch"},
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
          types: {
            feat: {
              title: 'Features 2',
            },
            fix: {
              title: 'Bug Fixes',
            },
            docs: {
              title: 'Documentation',
            },
            style: {
              title: 'Styles',
            },
            refactor: {
              title: 'Code Refactoring',
            },
            build: {
              title: 'Builds',
            },
            chore: {
              title: 'Chores',
            },
            revert: {
              title: 'Reverts',
            },
          },
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
