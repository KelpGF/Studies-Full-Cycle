import { Model, Column, PrimaryKey, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequilize/product.model";
import OrderModel from "./order.model";

@Table({ tableName: "order_items", timestamps: false })
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: number;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare productId: number;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false })
  declare quantity: number;
}
