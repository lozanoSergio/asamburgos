const routes = require('next-routes')

module.exports = routes()
.add('dashboard', '/dashboard')
.add('newUser', '/nuevo-alta')
.add('editUser', '/editar-perfil/:id')
.add('serviceRegister', '/registrar-servicios')
.add('activityRegister', '/registrar-actividad')
