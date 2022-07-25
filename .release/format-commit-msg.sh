#!/bin/bash
echo 'TEST'
message="$(cat $1)"

echo [[ $message =~ /[^\s]*/ ]]
echo ${BASH_REMATCH}

