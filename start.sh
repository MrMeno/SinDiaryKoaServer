#!/bin/bash
source /
KOA_HOME=/home/SinDiaryKoaServer
export KOA_HOME
echo "开始编译typescript文件"
TSC_COMPILE=`tsc`
sleep 1
if [$TSC_COMPILE -eq 0];
sleep 1
then
    echo "文件编译完成 开始重构"
    file_move1=`cp package.json ./dist`
    sleep 1
    file_move2=`cp -a engine ./dist/`
    sleep 1
    file_move3=`cp -a statics ./dist/`
    if [[ ($file_move3 -eq 0) && ($file_move1 -eq 0) && ($file_move2 -eq 0)]];
    then
        RE=`cd dist`
        sleep 1
        if [[ $file_move -eq 0 ]];
        then
            echo "重构完成"
            echo "koa-server构建完成启动"
        fi
    fi
fi