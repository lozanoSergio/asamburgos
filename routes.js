const routes = require('next-routes')

module.exports = routes()
.add('dashboard', '/dashboard')
.add('newUser', '/nuevo-alta')
.add('editUser', '/editar-perfil/:id')
.add('serviceRegister', '/registrar-servicios')
.add('activityRegister', '/registrar-actividades')
.add('editActivity', '/editar-actividad/:id')
.add('editService', '/editar-servicio/:id')

