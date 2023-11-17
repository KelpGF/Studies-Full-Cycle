import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
	tableName: 'invoice_items',
	timestamps: false,
})
export class InvoiceItemModel extends Model {
	@PrimaryKey
	@Column({ allowNull: false })
  declare public id: string

  @ForeignKey(() => InvoiceModel)
  declare public invoiceId: string

	@Column({ allowNull: false })
  declare public  name: string

	@Column({ allowNull: false })
  declare public price: number
}