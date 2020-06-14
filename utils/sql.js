// 创建数据库
// const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS wx_user_info(
//     user_id INT(5) NOT NULL AUTO_INCREMENT,
//     wx_id VARCHAR(255) NOT NULL,
//     user_name VARCHAR(255) NOT NULL,
//     user_phone VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL
//     PRIMARY KEY (user_phone)
// );`.replace(/[\r\n]/g, '')

// 查询数据表
const QUERY = (tableName,param,count) => {
     let str=getQueryParamstr(param);
    return `SELECT `+(count?`COUNT(*)`:`*`)+` FROM ${tableName} `+str;
}

// 插入数据
const INSERT = (tableName, param) => {
    let str = getInsertParamstr(param);
    return `INSERT INTO ${tableName} ` + str;
}

// 更新数据
const UPDATE = (tableName, { primaryKey, primaryVal }, { key, value }) => {
    reutrn`UPDATE ${tableName} SET ${key}=${val} WHERE
    (${primaryKey}=${primaryVal});`;
}

// 删除数据
const DELETE = (tableName, { primaryKey, primaryVal }) => {
    `DELETE FROM user WHERE
    (${primaryKey}=${primaryVal});`
}
const getRandomId = len => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var id = '';
    for (i = 0; i < len; i++) {
        id += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return id;
}

const getInsertParamstr=obj=>{
    let keyStr=``, valStr=``;
    Object.keys(obj).forEach(key => {
        keyStr+=`${key},`;
        valStr+=`'${obj[key]}',`;
    })
    keyStr=keyStr.substring(0, keyStr.length - 1);
    valStr=valStr.substring(0, valStr.length - 1);
    return `(${keyStr}) VALUES (${valStr})`;
};
/**
 * @obj 参数对象
 * @count @type bool 是否返回条数 

*/
const getQueryParamstr=obj=>{
    let str=``;
    Object.keys(obj).forEach(key=> {
        str+=`${key}='${obj[key]}',`;
    });
    str=str.substring(0, str.length - 1);
    return `WHERE (${str})`;
};

module.exports = {
    // CREATE_TABLE,
    getRandomId,
    QUERY,
    INSERT,
    UPDATE,
    DELETE
}