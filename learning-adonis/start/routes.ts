import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const RedisController = () => import('#controllers/redis_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const TokenLoginController = () => import('#controllers/auth/token_login_controller')
const StorageController = () => import('#controllers/storage_controller')
const HomeController = () => import('#controllers/home_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const CoursesController = () => import('#controllers/courses_controller')
const ModuleController = () => import('#controllers/modules_controller')
const VideoClassesController = () => import('#controllers/video_classes_controller')
const StudentRegistersController = () => import('#controllers/student_registers_controller')

router.get('/home', [HomeController, 'index']).as('home').use(middleware.auth())

router.get('/storage/*', [StorageController, 'show']).as('storage.show').use(middleware.admin())

router
  .get('/courses/courses_list', [CoursesController, 'list'])
  .as('courses.list')
  .use(middleware.admin())

router
  .delete('/courses/courses_list/:id', [CoursesController, 'softDelCourse'])
  .as('course.softdelete')
  .use(middleware.admin())

router
  .get('/courses/:slug', [CoursesController, 'show'])
  .as('course.show')
  .where('slug', router.matchers.slug())

router
  .get('/courses/modules/:slug', [ModuleController, 'index'])
  .as('course.module')
  .where('slug', router.matchers.slug())

router
  .post('/courses/modules/:slug/:courseId', [ModuleController, 'create'])
  .as('course.module.create')
  .where('slug', router.matchers.slug())

router
  .get('/courses/modules/modules_list/:slug/:courseId', [ModuleController, 'list'])
  .as('modules.list')
  .use(middleware.admin())

router
  .delete('/courses/modules/modules_list/:id', [ModuleController, 'softDelClass'])
  .as('modules.softdelete')
  .use(middleware.admin())

router
  .get('/courses/video_classes/:slug/:moduleId', [VideoClassesController, 'view'])
  .as('module.classes')
  .where('slug', router.matchers.slug())

router
  .get('/courses/video_classes/createClasses/:slug/:moduleId', [VideoClassesController, 'index'])
  .as('video.classes')
  .where('slug', router.matchers.slug())

router
  .post('/courses/video_classes/createClasses/create/:slug/:moduleId', [
    VideoClassesController,
    'create',
  ])
  .as('video.classes.create')
  .where('slug', router.matchers.slug())

router
  .get('/courses/video_classes/classes_list/:slug/:moduleId', [VideoClassesController, 'list'])
  .as('video.classes.list')
  .where('slug', router.matchers.slug())

router
  .delete('/courses/video_classes/classes_list/:id', [VideoClassesController, 'softDelClass'])
  .as('video.classes.softdelete')

router
  .get('/courses/students/students_create/:slug/:courseId', [StudentRegistersController, 'create'])
  .as('students.register')
  .where('slug', router.matchers.slug())

router
  .get('/courses/students/students_list/:slug/:courseId', [StudentRegistersController, 'list'])
  .as('students.list')
  .where('slug', router.matchers.slug())
  .use(middleware.admin())

router
  .delete('/courses/students/students_list/:id', [StudentRegistersController, 'softDelRegister'])
  .as('students.softdelete')
  .use(middleware.admin())

router.delete('/redis/flush', [RedisController, 'flush']).as('redis.flush').use(middleware.auth())

router
  .delete('/redis/:slug', [RedisController, 'destroy'])
  .as('redis.destroy')
  .use(middleware.auth())

router.get('/', [LoginController, 'show']).as('login').use(middleware.guest())

router.get('auth/token', [TokenLoginController, 'show']).as('login.token').use(middleware.guest())

// ROTAS PARA CURSOS

router
  .get('/admin/courses/:id', [CoursesController, 'index'])
  .as('courses.index')
  .use(middleware.auth())

router
  .post('/admin/courses/create', [CoursesController, 'create'])
  .as('courses.create')
  .use(middleware.admin())

router
  .put('/admin/courses/create', [CoursesController, 'edit'])
  .as('courses.edit')
  .use(middleware.admin())

// ROTAS PARA MODULOS

router
  .post('/admin/courses/insert_student', [StudentRegistersController, 'addStudent'])
  .as('insert.student')
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
