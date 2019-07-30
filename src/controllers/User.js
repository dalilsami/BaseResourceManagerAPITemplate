import ResourceController from '../classes/ResourceController'

class UserController extends ResourceController {
  constructor() {
    super('users')
  }

  test = () => console.log('test')
}

new UserController()
