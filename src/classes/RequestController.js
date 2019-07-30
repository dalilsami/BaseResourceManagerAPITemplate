import controllers from '../controllers'

export default class RequestController {
  constructor(name) {
		if (!(name in controllers))
			throw new Error('RequestController: controller does not exist')
		this.controller = controllers[name]
  }

  get = (req, res) =>
    this.controller
      .get(req.query || {})
      .then(data => res.status(200).send(data))
  
  getOne = (req, res) =>
    this.controller
      .getOne(req.params.id)
      .then(elem => res.status(200).send(elem))

  post = (req, res) =>
    (Array.isArray(req.body) ?
      Promise.all(req.body.map(item =>
        this.controller
          .insertOne(item)
      ))
      : this.controller
        .insertOne(req.body)
    ).then(data => res.status(201).send(data))

  patchOne = (req, res) =>
    this.controller
      .updateOne(req.params.id, req.body)
      .then(value => res.status(200).send(value))
  
  deleteOne = (req, res) =>
    this.controller
      .delete(req.params.id)
      .then(() => res.status(200).end())
}
