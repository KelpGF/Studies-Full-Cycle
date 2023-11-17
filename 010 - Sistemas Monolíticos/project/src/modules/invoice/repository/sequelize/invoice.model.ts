import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { InvoiceItemModel } from './invoice-item.model';

@Table({
	tableName: 'invoice',
	timestamps: false,
})
export class InvoiceModel extends Model {
	@PrimaryKey
	@Column({ allowNull: false })
	declare public id: string;

	@Column({ allowNull: false })
	declare public name: string;

	@Column({ allowNull: false })
	declare public document: string;

	@Column({ allowNull: false })
	declare public street: string;

	@Column({ allowNull: false })
	declare public number: string;

	@Column({ allowNull: false })
	declare public complement: string;

	@Column({ allowNull: false })
	declare public city: string;

	@Column({ allowNull: false })
	declare public state: string;

	@Column({ allowNull: false })
	declare public zipCode: string;

	@Column({ allowNull: false })
	declare public total: number;

  @Column({ allowNull: false })
  declare public createdAt: Date;

  @HasMany(() => InvoiceItemModel)
  declare public items: InvoiceItemModel[]
}
