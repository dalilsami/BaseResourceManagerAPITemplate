import collections from '../database/collections'
import ResourceController, { controllers } from '../classes/ResourceController'

collections.forEach(c => new ResourceController(c))

export default controllers