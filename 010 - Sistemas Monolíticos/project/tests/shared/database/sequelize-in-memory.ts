import { ModelCtor, Sequelize } from "sequelize-typescript";

export const sequelizeInMemory = async (models: ModelCtor[]) => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });

  sequelize.addModels(models);
  await sequelize.sync();

  return sequelize;
};