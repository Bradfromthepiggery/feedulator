#!/bin/sh

#Find the Process ID for feedulator server

ps -ef | grep feedulator_server_v_1.jar | grep -v grep | awk '{print $2}' | xargs kill -9
#echo $PID
#check PID is right
#kill -9 $PID

nohup java -jar feedulator_server_v_1.jar > log/history.out 2>log/histerr.err &

echo "server restart!"
