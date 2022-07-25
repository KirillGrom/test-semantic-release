#!/bin/bash
echo 'TEST'
message="$(cat $1)"
arr=($message)
echo ${arr[0]}

