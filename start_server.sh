#!/bin/sh

nohup java -jar feedulator_server_v_1.jar > log/history.out 2>log/histerr.err &

echo " server start! " 
