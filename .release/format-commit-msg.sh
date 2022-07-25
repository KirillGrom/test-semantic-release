#!/bin/bash
echo 'TEST'
arr=($(cat $1))
type_commit=${arr[0]}
jira_ticket=${arr[1]}
message_commit=${arr[2]}
echo $type_commit
echo $jira_ticket
echo $message_commit

