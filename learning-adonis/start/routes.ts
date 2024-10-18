const RedisController = () => import('#controllers/redis_controller')
import router from '@adonisjs/core/services/router'
const MoviesController = () => import('#controllers/movies_controller')

router.get('/', [MoviesController, 'index']).as('home')

router
  .get('/movies/:slug', [MoviesController, 'show'])
  .as('movies.show')
  .where('slug', router.matchers.slug())

router.post('/redis/flush', [RedisController, 'flush']).as('redis.flush')

router.post('/redis/:slug', [RedisController, 'destroy']).as('redis.destroy')
