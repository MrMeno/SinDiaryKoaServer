import {connection} from './db_connection';
var roleInfo__Table= connection.define('role_info',
    {
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    connection.models.roleInfo__Table;
	export default{
			roleInfo__Table
	}
  