module.exports = {
  dryRun: false,
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
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
