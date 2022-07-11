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
          headerPattern: /^(feat|fix|perf|test|BREAKING CHANGE):.*\[REF-(\d{3,}|N\\A)\] \S+ \S+ \S+ \S+ \S+/,
          headerCorrespondence: ['type', 'scope', 'subject'],
        "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
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
