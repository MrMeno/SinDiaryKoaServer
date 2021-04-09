import *as crypto from 'crypto'
export default class toolClass {
    constructor() {
    }
    /**
    *
    日期拼接（因系统的原因需要单独把年月日取出来手动拼接）
    *@date
    日期
    *@dateFormat
    日期格式
    (
    默认
    yyyy-mm-dd)
    *@isRemoveTimeAndSeconds
    是否去除时分秒
    **/
    public static getJoinDateFormat = (date: any, dateFormat: any, isRemoveTimeAndSeconds: any) => {
        if (!date) {
            return '';
        }
        if (isRemoveTimeAndSeconds && date && date.indexOf && date.indexOf(':') > -1) {
            //eslint-disable-next-lineno-param-reassign
            date = date.substr(0, 10);
        }
        //eslint-disable-next-lineno-param-reassign
        date = new Date(date);
        let seperator1 = '-';
        let seperator2 = ':';
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = `0${month}`;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = `0${strDate}`;
        }
        if (hours >= 0 && hours <= 9) {
            hours = `0${hours}`;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = `0${minutes}`;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = `0${seconds}`;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        //eslint-disable-next-lineeqeqeq
        if (dateFormat == 'YYYYMMDD') {
            currentdate = date.getFullYear() + month + strDate;
        } else if (dateFormat == 'YYYYMMDDHHMMSS') {
            currentdate = date.getFullYear() + month + strDate + hours + minutes + seconds;
        } else if (dateFormat == 'YYYY-MM-DDHH:MM:SS') {
            currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate}
            ${hours}${seperator2}${minutes}${seperator2}${seconds}`;
        } else if (dateFormat == 'YYYY-MM-DDHH:MM') {
            currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate}
            ${hours}${seperator2}${minutes}`;
        }
        return currentdate;
    }
    /**
    *@len
    随机字符串长度
    *@return
    随机字符串
    */
    public static getRadomHex = (len: number) => {
        let bufferStr = crypto.randomBytes(len);
        return bufferStr.toString('hex');
    }
    /**
    *@min
    最小值
    *@max
    最大值
    *@return
    随机数
    */
    publicstaticgetRandom(min: number, max: number) {
        return Math.floor(Math.random() * (min - max) + max) +
            Number(Math.random().toFixed(4));
    }
    /**
    **
    洗牌算法
    *@arr
    输入的数组
    *@return
    输出重新排序的数组
    */
    public static yateFisher(arr: Array<string>) {
        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);//5555
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }
    publicstaticsleep(millSeconds: number) {
        var StartTime = new Date().getTime();
        let i = 0;
        while (new Date().getTime() < StartTime + millSeconds);
    }
};