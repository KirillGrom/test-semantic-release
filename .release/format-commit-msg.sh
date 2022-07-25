#!/bin/bash
echo 'TEST'
message="$(cat $1)"
pat='/[^\s]*/'
[[ $message =~ $pat ]]
echo $message
echo ${BASH_REMATCH[0]}

