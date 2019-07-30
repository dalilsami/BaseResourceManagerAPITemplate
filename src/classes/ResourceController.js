import { ObjectId } from 'mongodb'

import MongoInstance from '../database/mongo'
import collections from '../database/collections'

export default class ResourceController {
  constructor(name) {
    controllers[name] = this
    if (collections.includes(name))
      MongoInstance.waiting.then(() =>
        (this.collection = MongoInstance.client.collection(name))
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

export const createResourceController = name => {
  if (!name || typeof name !== 'string')
    throw new Error('ResourceController: Bad argument given for constructor, string required')
  return controllers[name] || new ResourceController(name)
}

export const controllers = {}
