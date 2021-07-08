import { Table, Column, Model } from 'sequelize-typescript'
//import{DataType}from'sequelize/types'
/**
*host:10.100.6.162
*database:gocrondb
***/
@Table({ tableName: 'tb_basic_user' })
export default class tb_basic_user extends Model<tb_basic_user>{
     @Column({
        primaryKey: true,
        autoIncrement: false,
    })
    user_id: string
    @Column({
        primaryKey: true,
    })
    user_name: string
    @Column
    pass_word: string
    @Column
    login_time: number
    @Column
    update_time: number
    @Column
    role: number
}
 