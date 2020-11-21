import { Table, Column, Model } from 'sequelize-typescript'
    @Table({tableName:'sys_role_basic'})
    export class sys_RoleBasic extends Model<sys_RoleBasic>{
        @Column({
            primaryKey: true,
            autoIncrement: false,
          })
          id: string
          @Column
          level: string
          @Column
          desc: string
          @Column
          level_key: string
          @Column
          level_name: string
          @Column
          param1: string
          @Column
          param2: string
          @Column
          param3: string
          @Column
          param4: string
          
    }

  