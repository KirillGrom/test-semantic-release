#!/bin/bash
echo 'TEST'
message="$(cat $1)"
pat='/[^\s]*/'
[[ $message =~ $pat ]]
echo $message
echo ${BASH_REMATCH[0]}
echo ${BASH_REMATCH[1]}
echo 'first url, second url, third url' | sed 's/.*second//'

