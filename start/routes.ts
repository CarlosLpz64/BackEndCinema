/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login', 'UsersController.login');
Route.post('logout', 'UsersController.logout');
Route.post('signup', 'UsersController.signup');
Route.post('verificarToken', 'UsersController.verificarToken');

//EL SIGUIENTE GRUPO SON LAS RUTAS QUE SON PARA CHECAR PERMISOS Y CHECAR EXISTENCIA ADEMAS DE PODER VER Y INSERTAR

Route.group(()=>{
  Route.get('checarpermiso/:id', 'TipoUsuariosController.VerificarPermiso')
  Route.get('checarexistencia/:id', 'TipoUsuariosController.VerificarExistencia')
  Route.post('store', 'TipoUsuariosController.InsertarTipo')
  Route.get('vertipos', 'TipoUsuariosController.Index')
}).prefix('api').middleware('auth')

//----------------------------------------------------------------------------------------------------------------

//USERS
Route.group(() => {
  Route.get('index', 'UsersController.index');
  Route.patch('updateUser/:id', 'UsersController.updateUser')
  Route.delete('deleteUser/:id', 'UsersController.deleteUser')
}).prefix('users').middleware('auth');

