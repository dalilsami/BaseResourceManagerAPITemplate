import { createResourceController, controllers } from '../classes/ResourceController'
import collections from '../database/collections'

import './User'

collections.forEach(c => createResourceController(c))

console.log(controllers)

export default controllers