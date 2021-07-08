#!/bin/bash
source /home/SinDiaryKoaServer
KOA_HOME=/home/node/SinDiaryKoaServer
SERVER_HOME=/home/node/SinDiaryKoaServer/dist
export KOA_HOME
echo "开始编译typescript文件"
file_remove=`rm -rf ./serveModel`
sleep 2
TSC_COMPILE=`tsc`
sleep 1
if ($TSC_COMPILE -eq 0);
then
    sleep 1
    echo "文件编译完成 开始重构"
    file_move1=`cp package.json ./dist`
    sleep 1
    file_move2=`cp -a engine ./dist/`
    sleep 1
    file_move3=`cp -a statics ./dist/`
    if ($file_move3 -eq 0);
    then
        RE=`cd dist`
        sleep 1
        if ($file_move -eq 0);
        then
          SERVER_INIT=`cnpm i`
            if ($SERVER_INIT -eq 0);
            then
                START_SERVER=`pm2 start ./bin/www.js`
                echo "koa-server success start"
            fi
        fi
    fi
fi