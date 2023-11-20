import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'clients',
  timestamps: false,  
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare public id: string;

  @Column({ allowNull: false })
  declare public name: string;

  @Column({ allowNull: false })
  declare public document: string;

  @Column({ allowNull: false })
  declare public email: string;

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
  declare public createdAt: Date;

  @Column({ allowNull: false })
  declare public updatedAt: Date;
}