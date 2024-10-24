import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const MoviesController = () => import('#controllers/admin/movies_controller')
const RedisController = () => import('#controllers/redis_controller')
const DirectorsController = () => import('#controllers/directors_controller')
const WritersController = () => import('#controllers/writers_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const TokenLoginController = () => import('#controllers/auth/token_login_controller')
const AdminClassesControler = () => import('#controllers/admin/movies_controller')
const StorageController = () => import('#controllers/storage_controller')
const ProfilesController = () => import('#controllers/profiles_controller')
const WatchlistsController = () => import('#controllers/watchlists_controller')
const HomeController = () => import('#controllers/home_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const CoursesController = () => import('#controllers/courses_controller')
const ModuleController = () => import('#controllers/modules_controller')

router.get('/home', [HomeController, 'index']).as('home').use(middleware.auth())

router.get('/storage/*', [StorageController, 'show']).as('storage.show').use(middleware.admin())

router
  .get('/courses/:slug', [CoursesController, 'show'])
  .as('course.show')
  .where('slug', router.matchers.slug())

router
  .get('/courses/modules/:slug', [ModuleController, 'index'])
  .as('course.module')
  .where('slug', router.matchers.slug())

router
  .post('/courses/modules/:slug/:cursoId', [ModuleController, 'create'])
  .as('course.module.create')
  .where('slug', router.matchers.slug())

router
  .group(() => {
    router.get('/watchlist', [WatchlistsController, 'index']).as('index')
    router.post('/watchlists/:movieId/toggle', [WatchlistsController, 'toggle']).as('toggle')
    router
      .post('/watchlists/:movieId/toggle-watched', [WatchlistsController, 'toggleWatched'])
      .as('toggle.watched')
  })
  .as('watchlists')
  .use(middleware.auth())

router
  .get('/directors', [DirectorsController, 'index'])
  .as('directors.index')
  .use(middleware.auth())

router
  .get('/directors/:id', [DirectorsController, 'show'])
  .as('directors.show')
  .use(middleware.auth())

router.get('/writers', [WritersController, 'index']).as('writers.index').use(middleware.auth())

router.get('/writers/:id', [WritersController, 'show']).as('writers.show').use(middleware.auth())

router.delete('/redis/flush', [RedisController, 'flush']).as('redis.flush').use(middleware.auth())

router
  .delete('/redis/:slug', [RedisController, 'destroy'])
  .as('redis.destroy')
  .use(middleware.auth())

router.get('/profile/edit', [ProfilesController, 'edit']).as('profiles.edit').use(middleware.auth())
router.put('/profiles', [ProfilesController, 'update']).as('profiles.update').use(middleware.auth())
router.get('/profiles/:id', [ProfilesController, 'show']).as('profiles.show').use(middleware.auth())

router.get('/', [LoginController, 'show']).as('login').use(middleware.guest())

router.get('auth/token', [TokenLoginController, 'show']).as('login.token').use(middleware.guest())

router
  .get('/admin/courses', [CoursesController, 'index'])
  .as('courses.index')
  .use(middleware.auth())

router
  .post('/admin/courses/create', [CoursesController, 'create'])
  .as('courses.create')
  .use(middleware.auth())

router
  .post('auth/token', [TokenLoginController, 'sendToken'])
  .as('sent.token')
  .use(middleware.guest())

router
  .get('auth/token/verify/:token', [TokenLoginController, 'validateToken'])
  .as('verify.token')
  .use(middleware.guest())

router
  .group(() => {
    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post('/register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())

    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

    router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())
  })
  .prefix('/auth')
  .as('auth')

router
  .group(() => {
    router.resource('movies', AdminClassesControler)
  })
  .prefix('/admin')
  .as('admin')
  .use(middleware.admin())
