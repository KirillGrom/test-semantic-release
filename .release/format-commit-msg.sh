#!/bin/bash
echo 'TEST'
arr=($(cat $1))
type_commit=${arr[0]}
jira_ticket=${arr[1]}
message_commit=${arr[2]}
types=("feat" "fix" "docs" "style" "refactor" "build" "chore" "revert")
emojis=("✨" "🐛" "📚" "💎" "📦" "🛠" "♻" "🗑")

function get_index_emoji {
 index=-1
for i in "${!types[@]}";
do
    if [[ "${types[$i]}" = "${type_commit}" ]];
    then
        index=$i
        break
    fi
done
echo $(( index ))
}
index_emoji=$( get_index_emoji)
val=$(echo "$message_commit" | perl -pe 's/^(.)/uc($1)/e')
echo "${emojis[index_emoji]} ${jira_ticket} ${val}" > .git/commit_editmsg
