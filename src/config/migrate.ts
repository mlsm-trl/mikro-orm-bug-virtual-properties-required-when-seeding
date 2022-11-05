import { MikroORM } from '@mikro-orm/core'

const migrate = async (orm: MikroORM) => {
  const migrator = orm.getMigrator()
  await migrator.up()
}

export default migrate
