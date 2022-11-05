import { MikroORM, MikroORMOptions } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import Container from 'typedi'
import config from '@config/index'
import ormConfig from '@config/mikro-orm.config'
import migrate from '@config/migrate'
import User from '@entities/User'

export default async (options: Partial<MikroORMOptions> = ormConfig) => {
  const orm = await MikroORM.init(options)
  if (config.orm.autoMigrate) {
    await migrate(orm)
  }

  Container.set<MikroORM<PostgreSqlDriver>>('orm', orm)
  Container.set('UserRepository', orm.em.getRepository(User))
}
