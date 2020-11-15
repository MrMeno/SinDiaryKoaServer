var connection = require('./seq_util.js');
const { BOOLEAN,INTEGER } = require('sequelize');
var sg_grab_info= connection.define('sg_grab_info',
    {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            increment:true
          },
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
    connection.models.sg_grab_info;
   module.exports= sg_grab_info;