import { Router } from 'express'

import controllers from '../controllers'

export default function RouterController(name) {
  const controller = controllers[name]
  const router = new Router()
  
  // [Validator, Action, Response]
  router.route('/')
    .get([f => f, f => f, f => f])
    .post([f => f, f => f, f => f])
  
  router.use('/:id', (req, res, next) =>
    controller
      .getOne(req.params.id)
      .then(item => {
        req.item = item
        next()
      })
      .catch(e => res.status(500).send(e.message))
  )

  router.route('/:id')
    .get([f => f, f => f, f => f])
    .patch([f => f, f => f, f => f])
    .delete([f => f, f => f, f => f])

  return router
}