#!/bin/bash
echo 'TEST'
message="$(cat $1)"

[[ $message =~ /[^\s]*/ ]]
echo ${BASH_REMATCH[0]}

