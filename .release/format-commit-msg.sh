#!/bin/bash
echo 'TEST'
message="$(cat $1)"
pat='(^[\w]+) (?:\[(.*)\]\s)([^\[].+)'
[[ $message =~ $pat ]]
echo $message
echo "${BASH_REMATCH[0]}"
echo "${BASH_REMATCH[1]}"
