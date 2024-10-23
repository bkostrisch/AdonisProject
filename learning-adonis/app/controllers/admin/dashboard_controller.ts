import Cineast from '#models/cineast'
import Movie from '#models/movie'
import MovieStatus from '#models/movie_status'
import Watchlist from '#models/watchlist'
import MovieService from '#services/movie_service'
import { movieFilterValidator } from '#validators/movie_filter'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async handle({ view, request, auth }: HttpContext) {
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

    return view.render('pages/admin/dashboard', {
      moviesCount,
      writersCount,
      directorsCount,
      watchedMoviesCount,
      movies,
      movieStatuses,
      movieSortOptions,
      filters,
    })
  }
}
