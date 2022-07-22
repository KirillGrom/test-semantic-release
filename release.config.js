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
        {"type": "smallFix", "release": false}
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
              title: 'Features',
              emoji: '✨',
            },
            fix: {
              title: 'Bug Fixes',
              emoji: '🐛',
              hidden: true,
            },
            docs: {
              title: 'Documentation',
              emoji: '📚',
              hidden: true,
            },
            style: {
              title: 'Styles',
              emoji: '💎',
              hidden: true,
            },
            refactor: {
              title: 'Code Refactoring',
              emoji: '📦',
              hidden: true,
            },
            perf: {
              title: 'Performance Improvements',
              emoji: '🚀',
            },
            test: {
              title: 'Tests',
              emoji: '🚨',
            },
            build: {
              title: 'Builds',
              emoji: '🛠',
            },
            chore: {
              title: 'Chores',
              emoji: '♻️',
            },
            revert: {
              title: 'Reverts',
              emoji: '🗑',
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
