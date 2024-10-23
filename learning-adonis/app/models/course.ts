import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Module from './module.js'
import StudentClass from './student_class.js'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare producerId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare posterUrl: string

  @belongsTo(() => User)
  declare producer: BelongsTo<typeof User>

  @hasMany(() => Module)
  declare module: HasMany<typeof Module>

  @hasMany(() => StudentClass)
  declare studentClass: HasMany<typeof StudentClass>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
