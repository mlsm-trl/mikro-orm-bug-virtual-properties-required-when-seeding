import { MikroORMOptions } from '@mikro-orm/core'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import config from '.'

const options: Partial<MikroORMOptions> = {
  entities: ['src/entities/*.{ts,js}'],
  ...config.orm,
  discovery: {
    warnWhenNoEntities: false,
  },
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: false,
  },
  migrations: {
    tableName: `${config.orm.dbName}_migrations`,
    path: 'migrations/',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    safe: true,
    emit: 'ts',
  },
  seeder: {
    path: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },
  debug: config.debug,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  cache: { enabled: false },
}

export default options
