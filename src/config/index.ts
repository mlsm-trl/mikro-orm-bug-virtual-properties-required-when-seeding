import { URL } from 'url'
import dotenv from 'dotenv'
import { MikroORMOptions } from '@mikro-orm/core'

function setupEnvironment(name: string) {
  dotenv.config({
    path: `${__dirname}/../../${name}`,
    debug:
      process.env.DEBUG === 'true' ||
      process.env.NODE_ENV?.startsWith('dev') === true,
  })
}

setupEnvironment('.env')

const url = new URL(
  `${process.env.APP_URL ? process.env.APP_URL : 'http://localhost:3333'}`,
)
if (process.env.APP_PORT) {
  url.port = process.env.APP_PORT
}

process.env.APP_PORT = process.env.APP_PORT || '3333'
process.env.APP_PROTOCOL = url.protocol

const config: {
  orm: Partial<MikroORMOptions> & {
    autoMigrate: boolean
  }
  isHttps: boolean
  appPort: number
  appPortSecure: number
  isDev: boolean
  isProd: boolean
  debug: boolean
} = {
  isHttps: process.env.APP_PROTOCOL === 'https',
  appPort: Number(process.env.APP_PORT),
  appPortSecure: process.env.APP_PORT_SECURE
    ? Number(process.env.APP_PORT_SECURE)
    : Number(process.env.APP_PORT) + 1,
  orm: {
    type: process.env.DB_DRIVER as any,
    dbName: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoMigrate: process.env.DB_AUTO_MIGRATE
      ? process.env.DB_AUTO_MIGRATE === 'true'
      : true,
  },
  isDev: process.env.NODE_ENV?.startsWith('dev') === true || false,
  isProd: process.env.NODE_ENV?.startsWith('prod') === true || false,
  debug:
    process.env.DEBUG === 'true' ||
    process.env.NODE_ENV?.startsWith('dev') === true,
}

export default config
