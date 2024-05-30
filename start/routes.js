/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome').as('home')
Route.on('/artikel').render('artikel').as('artikel')
Route.on('/layanan').render('layanan').as('layanan')
Route.on('/tentang-kami').render('tentang-kami').as('tentang-kami')
Route.on('/harga-produk').render('harga-produk').as('harga-produk')
Route.on('/data-produksi').render('data-produksi').as('data-produksi')
Route.on('/penyuluhan').render('penyuluhan').as('penyuluhan')
Route.on('/berita1').render('berita1').as('berita1')
Route.on('/berita2').render('berita2').as('berita2')
Route.on('/berita3').render('berita3').as('berita3')
Route.on('/berita4').render('berita4').as('berita4')
Route.on('/berita5').render('berita5').as('berita5')
Route.on('/berita6').render('berita6').as('berita6')

Route.get('/login', 'AuthController.showLogin').as('login');


Route.get('/login', 'AuthController.showLoginForm').as('login');
Route.post('/login', 'AuthController.login').as('login.post');


