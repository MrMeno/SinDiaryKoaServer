import {connection} from './db_connection';
import {DataTypes, Model} from 'sequelize'
class User extends Model {
	
}

var userInfo__Table = connection.define('user_info', {
	userName: {
		field: 'user_name',
		allowNull: false,
		type: DataTypes.STRING
	},
	userId: {
		field: 'user_id',
		allowNull: false,
		type: DataTypes.STRING,
		primaryKey: true
	},
	avator: {
		field: 'avator',
		allowNull: true,
		type: DataTypes.STRING
	}
}, {
	freezeTableName: true,
	timestamps: false
});
// (async () => {
//     var sqlReq = await sqlMap.sg_grab_info.create({
//       id:0,
//       content: '虎狗',
//       title: 'admin',
//       href: 'www.baidu.com',
//       author: 'admin',
//       publishTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd hh:mm:ss.S'),
//       updateTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd hh:mm:ss.S'),
//       grabPoint: '搜狗'
//     });
//     console.log('created: ' + JSON.stringify(sqlReq));
// })();
connection.models.userInfo__Table;
export default{
	userInfo__Table
}
