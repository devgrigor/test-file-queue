export default function parametrize(model, param) {
  return function (req, res, next, id) {
    return model.findById(id).exec()
      .then((data) => {
        if (!data) {
          return res.status(404).send({error: 'Not Found', message: 'Record not found.'});
        }
        req[param] = data;
        next();
      })
      .catch(err => next(err));
  }
}
