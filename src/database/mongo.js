import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'

class MongoController {
  startConnection = () =>
    new MongoMemoryServer().getConnectionString().then(url =>
      MongoClient.connect(url, {useNewUrlParser: true})
    ).then(connection =>
      (this.client = connection.db())
    )

  waiting = this.startConnection()
  client = null
}

export default new MongoController()

