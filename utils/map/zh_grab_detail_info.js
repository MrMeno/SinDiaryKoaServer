var connection = require('./seq_util.js');
const { BOOLEAN } = require('sequelize');
var zh_grab_detail_info= connection.define('zh_grab_detail_info',
    {
 
        content:{
            field: 'content',
            allowNull: true,
            type:String
        },
        title:
        {
            field: 'title',
            allowNull: true,
            type:String
        },
        href:
        {
            field: 'href',
            allowNull: true,
            type:String
        },
        author:
        {
            field: 'author',
            type:String
        },
        publishTime:
        {
            field: 'publish_time',
            type:String
        },
        updateTime:
        {
            field: 'update_time',
            type:String
        },
        zhNumber:
        {
            field: 'zh_no',
            allowNull: false,
            type:String,
            primaryKey:true
        },
        nickName:
        {
            field: 'nick_name',
            allowNull: true,
            type:String
        },
        grabPoint:
        {
            field: 'grab_point',
            allowNull: true,
            type:String
        }

    },
    {
        freezeTableName: true,
        timestamps: false
    });
    connection.models.zh_grab_detail_info;
   module.exports= zh_grab_detail_info;