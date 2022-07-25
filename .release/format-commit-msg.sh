#!/bin/bash
echo 'TEST'
message="$(cat $1)"
pat=/[^\s]*/
[[ $message =~ $pat ]]
echo ${BASH_REMATCH}

