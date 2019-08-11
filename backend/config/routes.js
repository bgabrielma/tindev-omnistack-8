module.exports = app => {
  // routes

  app.get('/auth', app.controllers.userController.save)
  app.get('/verify', app.controllers.userController.verify)
}
