import factory from '@adonisjs/lucid/factories'
import Profile from '#models/profile'

export const ProfileFactory = factory
  .define(Profile, async ({ faker }) => {
    return {
      description: faker.lorem.paragraphs(),
    }
  })
  .build()
