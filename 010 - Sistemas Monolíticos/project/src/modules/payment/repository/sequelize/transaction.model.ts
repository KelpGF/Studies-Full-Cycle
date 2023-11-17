import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: 'transactions', timestamps: false })
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare public id: string

  @Column({ allowNull: false })
  declare public orderId: string

  @Column({ allowNull: false })
  declare public amount: number

  @Column({ allowNull: false })
  declare public status: string

  @Column({ allowNull: false })
  declare public createdAt: Date

  @Column({ allowNull: false })
  declare public updatedAt: Date
}
