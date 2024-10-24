import Cineast from '#models/cineast'
import Course from '#models/course'
import Movie from '#models/movie'
import MovieStatus from '#models/movie_status'
import Watchlist from '#models/watchlist'
import CourseService from '#services/course_service'
import MovieService from '#services/movie_service'
import { courseValidator } from '#validators/course'
import { movieFilterValidator } from '#validators/movie_filter'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class HomeController {
  private courseService: CourseService

  constructor() {
    this.courseService = new CourseService()
  }
  async index({ request, view, auth, response }: HttpContext) {
    const page = request.input('page', 1)
    const filters = await movieFilterValidator.validate(request.qs())
    const movies = await MovieService.getFiltered(filters, auth.user).paginate(page, 15)
    const movieStatuses = await MovieStatus.query().orderBy('name').select('id', 'name')
    const movieSortOptions = MovieService.sortOptions
    const moviesCount = await Movie.query().count('id').firstOrFail()
    const writersCount = await Cineast.query()
      .whereHas('moviesWritten', (query) => query)
      .count('id')
      .firstOrFail()
    const directorsCount = await Cineast.query()
      .whereHas('moviesDirected', (query) => query)
      .count('id')
      .firstOrFail()
    const watchedMoviesCount = await Watchlist.query()
      .whereNotNull('watchedAt')
      .count('id')
      .firstOrFail()

    movies.queryString(filters)

    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }
    const producerId = auth.user.id

    const courses = await this.courseService.listCourseByUser(producerId)

    return view.render('pages/home', {
      moviesCount,
      writersCount,
      directorsCount,
      watchedMoviesCount,
      movies,
      movieStatuses,
      movieSortOptions,
      filters,
      courses,
    })
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)
    const cast = await movie.related('castMembers').query().orderBy('pivot_sort_order')
    const crew = await movie
      .related('crewMembers')
      .query()
      .pivotColumns(['title', 'sort_order'])
      .orderBy('pivot_sort_order')

    await movie.load('director')
    await movie.load('writer')

    return view.render('pages/movies/show', { movie, cast, crew })
  }
}
