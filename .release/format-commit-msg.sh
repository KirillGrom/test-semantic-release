#!/bin/bash
echo 'TEST'
arr=($(cat $1))
type_commit=${arr[0]}
jira_ticket=${arr[1]}
message_commit=${arr[2]}
types=("feat" "fix" "docs" "style" "refactor" "build" "chore" "revert")
emojis=("✨" "🐛" "📚" "💎" "📦" "🛠" "♻" "🗑")

function get_index_emoji {
for i in "${!types[@]}";
do
    if [[ "${types[$i]}" = "${type_commit}" ]];
    then
        echo "${types[$i]}"
        return $(( $i ))
    fi
done
}
result=$( get_index_emoji)
echo $result
