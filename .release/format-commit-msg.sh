#!/bin/bash
echo 'TEST'
arr=($(cat $1))
type_commit=${arr[0]}
jira_ticket=${arr[1]}
message_commit=${arr[2]}
types_commit=("feat" "fix" "docs" "style" "refactor" "build" "chore" "revert")
emojis=("✨" "🐛" "📚" "💎" "📦" "🛠" "♻" "🗑")

function get_index_emoji {
for i in "${!types_commit[@]}";
do
    if [[ "${types_commit[$i]}" = "${type_commit}" ]];
    then
        return $(( $i ))
    fi
done
}
echo ${get_index_emoji}
