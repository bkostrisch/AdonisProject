import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Module from './module.js'
import string from '@adonisjs/core/helpers/string'
import StudentClass from './student_class.js'
import Base from './softdelete.js'

export default class Course extends Base {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare posterUrl: string

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare producer: BelongsTo<typeof User>

  @hasMany(() => Module)
  declare module: HasMany<typeof Module>

  @hasMany(() => StudentClass)
  declare studentClass: HasMany<typeof StudentClass>

  @beforeCreate()
  static async slugify(course: Course) {
    if (course.slug) return
    const slug = string.slug(course.title, {
      replacement: '-',
      lower: true,
      strict: true,
    })
    const rows = await Course.query()
      .select('slug')
      .whereRaw('lower(??) = ?', ['slug', slug])
      .orWhereRaw('lower(??) like ?', ['slug', `${slug}-%`])

    if (!rows.length) {
      course.slug = slug
      return
    }

    const incrementors = rows.reduce<number[]>((result, row) => {
      const tokens = row.slug.toLowerCase().split(`${slug}-`)

      if (tokens.length < 2) {
        return result
      }

      const increment = Number(tokens.at(1))

      if (!Number.isNaN(increment)) {
        result.push(increment)
      }

      return result
    }, [])
    const increment = incrementors.length ? Math.max(...incrementors) + 1 : 1

    course.slug = `${slug}-${increment}`
  }
}
