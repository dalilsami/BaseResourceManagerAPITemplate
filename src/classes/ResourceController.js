import { ObjectId } from 'mongodb'

import MongoInstance from '../database/mongo'
import collections from '../database/collections'

export default class ResourceController {
  constructor(collection) {
    if (!collection || typeof collection !== 'string')
      throw new Error('ResourceController: Bad arguments for construction')
    if (collection in controllers)
      throw new Error('ResourceController: controller alrealdy added')
    controllers[collection] = this
    if (collections.includes(collection))
      MongoInstance.waiting.then(() =>
        (this.collection = MongoInstance.client.collection(collection))
      )
  }

  get = (filter = {}) =>
    this.collection
      .find(filter)
      .toArray()
  
  getOne = id =>
    this.collection
      .findOne(new ObjectId(id))

  insertOne = (item) =>
    this.collection
      .insertOne(item)
      .then(({ ops: [value] }) => value)
  
  updateOne = (id, { _id, ...item }) =>
    this.collection
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: item },
        { returnOriginal: false }
      ).then(({ value }) => value)
  
  delete = id =>
    this.collection
      .deleteOne({ _id: new ObjectId(id) })
}

export const controllers = {}
