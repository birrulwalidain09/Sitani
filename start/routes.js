/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome').as('home')
Route.on('/artikel').render('artikel').as('artikel')
Route.on('/layanan').render('layanan').as('layanan')
Route.on('/tentang-kami').render('tentang-kami').as('tentang-kami')
Route.on('/harga-produk').render('harga-produk').as('harga-produk')

Route.get('/login', 'AuthController.showLogin').as('login');


Route.get('/login', 'AuthController.showLoginForm').as('login');
Route.post('/login', 'AuthController.login').as('login.post');


