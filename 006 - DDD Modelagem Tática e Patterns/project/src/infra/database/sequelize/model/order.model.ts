import { Model, Column, PrimaryKey, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customerId: number;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}
