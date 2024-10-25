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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare expiresAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt?: DateTime

  @belongsTo(() => User)
  declare student: BelongsTo<typeof User>

  @belongsTo(() => StudentClass)
  declare studentClass: BelongsTo<typeof StudentClass>

  static async createEnrollment(studentId: number, studentClassId: number) {
    const enrollment = new StudentRegister()
    enrollment.studentId = studentId
    enrollment.studentClassId = studentClassId
    enrollment.expiresAt = DateTime.now().plus({ days: 30 })
    await enrollment.save()
  }
}
