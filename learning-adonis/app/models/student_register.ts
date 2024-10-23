import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import StudentClass from './student_class.js'

export default class StudentRegister extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare studentId: number

  @column()
  declare studentClassId: number

  @column()
  declare courseId: number

  @column.dateTime()
  declare expiresAt: DateTime

  @belongsTo(() => User)
  declare student: BelongsTo<typeof User>

  @belongsTo(() => StudentClass)
  declare studentClass: BelongsTo<typeof StudentClass>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
