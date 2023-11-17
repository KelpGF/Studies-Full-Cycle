import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'products',
  timestamps: false
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({allowNull: false })
  declare public id: string;

  @Column({allowNull: false })
  declare public name: string;

  @Column({allowNull: false })
  declare public description: string;

  @Column({allowNull: false })
  declare public salesPrice: number;
}