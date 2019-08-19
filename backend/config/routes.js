module.exports = app => {
  // routes

  app.route('/user')
    .get(app.controllers.userController.get)
    .post(app.controllers.userController.save)

  app.post('/likes/:destination', app.controllers.feedbackController.newLike)
  app.post('/dislikes/:destination', app.controllers.feedbackController.newDislike)

  app.route('/likes')
    .get(app.controllers.feedbackController.getLikes)

  app.route('/dislikes')
    .get(app.controllers.feedbackController.getDislikes)
}
