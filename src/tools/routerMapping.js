import { Router } from 'express'

export default function routerMapping(routerController, basePath = '', router = Router()) {
  router.get(basePath, routerController.get)
  router.get(`${basePath}/:id`, routerController.getOne)
  router.post(basePath, routerController.post)
  router.patch(`${basePath}/:id`, routerController.patchOne)
  router.delete(`${basePath}/:id`, routerController.deleteOne)
  return router
}