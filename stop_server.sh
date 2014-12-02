#!/bin/sh

#Find the Process ID for feedulator server

ps -ef | grep feedulator_server_v_1.jar | grep -v grep | awk '{print $2}' | xargs kill -9
#echo $pid
#check PID is right
#kill -9 $pid

echo " server stop!"

