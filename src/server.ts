import 'reflect-metadata'
import https from 'https'
import * as devcert from 'devcert'
import express from '@config/bootstrap'
import loadMikroOrm from '@config/mikro-orm'
import config from '@config/index'
;(async () => {
  const app = await express()
  await loadMikroOrm()
  if (!config.isProd) {
    app.listen(config.appPort)
    const ssl = await devcert.certificateFor('localhost')
    https.createServer(ssl, app).listen(config.appPortSecure)
  } else {
    app.listen(config.appPort)
  }
})()
