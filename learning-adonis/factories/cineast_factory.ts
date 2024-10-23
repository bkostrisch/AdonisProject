import factory from '@adonisjs/lucid/factories'
import Cineast from '#models/cineast'
import { MovieFactory } from './movie_factory.js'

export const CineastFactory = factory
  .define(Cineast, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      headshotUrl: faker.image.avatar(),
    }
  })
  .relation('moviesDirected', () => MovieFactory)
  .relation('moviesWritten', () => MovieFactory)
  .relation('castMovies', () => MovieFactory)
  .relation('crewMovies', () => MovieFactory)
  .build()
