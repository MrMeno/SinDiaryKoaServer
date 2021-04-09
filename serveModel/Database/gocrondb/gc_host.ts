import { Table, Column, Model } from 'sequelize-typescript'
//import{DataType}from'sequelize/types'
/**
*host:10.100.6.162
*database:gocrondb
***/
@Table({ tableName: 'gc_host' })
export class gc_host extends Model<gc_host>{
    @Column({
        primaryKey: true,
        autoIncrement: false,
    })
    id!: number
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    name!: string
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    alias!: string
    @Column({
        allowNull: false,
        defaultValue: 1
    })
    port!: number
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    remark!: string
}