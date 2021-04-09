import { Table, Column, Model } from 'sequelize-typescript'
import toolClass from '../../../utils/tool/index';
/**
*host:10.100.6.162
*database:gocrondb
***/
@Table({ tableName: 'gc_task' })
export class gc_task extends Model<gc_task>{
    @Column({
        primaryKey: true,
        autoIncrement: false,
    })
    id!: number;
    @Column({
        allowNull: false,
        defaultValue: '',
    })
    name!: string;
    @Column({
        allowNull: false,
        defaultValue: 1
    })
    level!: number;
    @Column({
        allowNull: false,
        defaultValue: 1
    })
    dependency_task_id!: string;
    @Column({
        allowNull: false,
        defaultValue: 1
    })
    dependency_status!: number;
    @Column({
        allowNull: false,
        defaultValue: '000000'
    })
    spec!: string;
    @Column({
        allowNull: false,
        defaultValue: 2
    })
    protocol!: number;
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    command!: string;
    @Column({
        allowNull: false,
        defaultValue: 1
    })
    http_method!: number;
    @Column({
        allowNull: false,
        defaultValue: 60
    })
    timeout!: number;
    @Column({
        allowNull: false,
        defaultValue: 2
    })
    multi!: number;
    @Column({
        allowNull: false,
        defaultValue: 0
    })
    retry_times!: number;
    @Column({
        allowNull: false,
        defaultValue: 0
    })
    retry_interval!: number;
    @Column({
        allowNull: false,
        defaultValue: 1
    })
    notify_status!: number;
    @Column({
        allowNull: false,
        defaultValue: 2
    })
    notify_type!: number;
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    notify_receiver_id!: string;
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    notify_keyword!: string;
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    tag!: string;
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    remark!: string;
    @Column({
        allowNull: false,
        defaultValue: 1
    })
    status!: number;
    @Column({
        allowNull: false,
        defaultValue: toolClass.getJoinDateFormat(new Date(), 'YYYY-MM-DDHH:MM:SS', false)
    })
    created!: string;
    @Column
    deleted!: string;
    @Column({
        allowNull: false,
        defaultValue: ''
    })
    operator!: string;
}