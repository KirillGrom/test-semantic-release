#!/bin/bash
echo 'TEST'
message="$(cat $1)"
pat='/[^\s]*/'
echo [[ $message =~ $pat ]]

