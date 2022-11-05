import path from 'path'
import express, { Express } from 'express'
import { useExpressServer, useContainer } from 'routing-controllers'
import Container from 'typedi'
import config from '@config/index'

const basePath = path.join(__dirname, '/..')

export default (): Express => {
  useContainer(Container)

  const app = express()

  useExpressServer(app, {
    cors: true,
    classToPlainTransformOptions: {
      enableCircularCheck: true,
    },
    plainToClassTransformOptions: {
      enableCircularCheck: true,
    },
    validation: {
      validationError: {
        target: config.debug,
        value: config.debug,
      },
    },
    controllers: [
      path.join(basePath, '/modules/**/*.controller.{ts,js}'),
      path.join(basePath, '/modules/**/controllers/*.{ts,js}'),
    ],
  })

  return app
}
