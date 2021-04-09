import { Table, Column, Model } from 'sequelize-typescript'
//import{DataType}from'sequelize/types'
/**
*host:10.100.6.162
*database:gocrondb
***/
@Table({ tableName: 'tb_it_task_action' })
export class tb_it_task_action extends Model<tb_it_task_action>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number
    @Column
    editor: string
    @Column
    actionTime: string
    @Column
    actionName: string
    @Column
    task_id: number
    @Column
    task_name: string
}