import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import MongoInstance from './database/mongo'
import BaseRouter from './classes/BaseRouter'
import routerMapping from './tools/routerMapping'
import collections from './database/collections'

const port = process.env.PORT || 3001
const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

Object.entries({}).forEach(([path, router]) =>
  app.use(`/${path}`, router)
)

collections.forEach(name =>
  routerMapping(new BaseRouter(name), `/${name}`, app)
)

MongoInstance.waiting.then(() => {
  app.listen(port, () => console.log(`API ready : port ${port}`))
})
