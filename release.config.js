const emojis = {
  feat:'✨',
  fix: '🐛',
  docs: '📚',
  style: '💎',
  refactor: '📦',
  build: '🛠',
  chore: '♻',
  revert:'🗑',
}

const headerPattern = new RegExp(/(^[✨|🐛|📚|💎|📦|🛠|♻|🗑]+) (?:\[(.*)\]\s)([^\[].+)/)

module.exports = {
  dryRun: false,
  ci: false,
  branch: 'master',
  plugins: [
    ['@semantic-release/commit-analyzer',{
      releaseRules: [
        {type: emojis.feat, release: "minor"},
        {type: emojis.fix, release: "patch"},
        {type: emojis.refactor, release: "minor"},
        {type: emojis.docs, release: "patch"},
        {type: emojis.build, release: "patch"},
        {type: emojis.chore, release: "patch"},
      ],
      parserOpts: {
        headerPattern,
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
        },
        parserOpts: {
          headerPattern,
          headerCorrespondence: ["type", "ticket", "subject"],
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
        writerOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
          transform: (commit, context) => {
            let discard = true
            const issues = []

            commit.notes.forEach(note => {
              note.title = `BREAKING CHANGES`
              discard = false
            })

            if (commit.type === emojis.feat) {
              commit.type = `Features test`
            } else if (commit.type === emojis.fix) {
              commit.type = `Bug Fixes`
            } else if (commit.type === emojis.revert || commit.revert) {
              commit.type = `Reverts`
            } else if (discard) {
              return
            } else if (commit.type === emojis.docs) {
              commit.type = `Documentation`
            } else if (commit.type === emojis.style) {
              commit.type = `Styles`
            } else if (commit.type === emojis.refactor) {
              commit.type = `Code Refactoring`
            } else if (commit.type === emojis.build) {
              commit.type = `Build System`
            }
            if (commit.scope === `*`) {
              commit.scope = ``
            }

            if (typeof commit.hash === `string`) {
              commit.shortHash = commit.hash.substring(0, 7)
            }

            if (typeof commit.subject === `string`) {
              let url = context.repository
                ? `${context.host}/${context.owner}/${context.repository}`
                : context.repoUrl
              if (url) {
                url = `${url}/issues/`
                // Issue URLs.
                commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
                  issues.push(issue)
                  return `[#${issue}](${url}${issue})`
                })
              }
              if (context.host) {
                // User URLs.
                commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
                  if (username.includes('/')) {
                    return `@${username}`
                  }

                  return `[@${username}](${context.host}/${username})`
                })
              }
            }

            // remove references that already appear in the subject
            commit.references = commit.references.filter(reference => {
              if (issues.indexOf(reference.issue) === -1) {
                return true
              }

              return false
            })

            return commit
          },
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
