#!/bin/bash
echo 'TEST'
arr=($(cat $1))
type_commit=${arr[0]}
jira_ticket=${arr[1]}
message_commit=${arr[2]}
declare -A emojis=(
[feat]="✨"
[fix]="🐛"
[refactor]="📦"
[docs]="📚"
[style]="💎"
[refactor]="📦"
[build]="🛠"
[chore]="♻️"
[revert]="🗑"
)
echo ${emojis[style]}
