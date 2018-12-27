'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// Route.on('/').render('index');

Route.get('/', 'JobController.allJobs');

// retrieves all jobs
// Route.get('/jobs', 'JobController.allJobs');

// user authentication
Route.on('/signup').render('auth/signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.on('/login').render('auth/login');
Route.post('/login', 'UserController.login').validator('LoginUser');

// Logout user
Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

Route.get('/jobs', 'JobController.allUserJobs');
Route.post('/jobs', 'JobController.create');
Route.on('/jobs/new').render('jobs/new');
Route.get('/jobs/detail/:id', 'JobController.detail');
Route.get('/jobs/edit/:id', 'JobController.edit');
Route.post('/jobs/update/:id', 'JobController.update').validator('CreateJob');
Route.get('/jobs/delete/:id', 'JobController.delete');
