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
        parserOpts: {
          headerPattern: new RegExp(/(^[\w]+) (?:\[(.*)\]\s)([^\[].+)/),
          headerCorrespondence: ["type", "ticket", "subject"],
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
        writerOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
        commit: '<commit>'
      }
    ],
    ["semantic-release-telegram", {
      "name": "test-semantic-release",
      "chats": [411334627],
      "templates": {
        "fail"    : "An error occured while trying to publish the new version of <b>{name}</b>.\n<pre><code class='language-javascript'>{error}</code></pre>",
        "success" : "A new version of <a href='{repository_url}'>{name}</a> has been released. Current version is <b>{version}</b>"
      }
    }],
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
