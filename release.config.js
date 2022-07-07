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
        "assets": ["docs/CHANGELOG.md"],
      },
    ],
  ],
  "preset": 'angular',
};
