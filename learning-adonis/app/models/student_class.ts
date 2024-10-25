import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Course from './course.js'
import StudentRegister from './student_register.js'

export default class StudentClass extends BaseModel {
  public static readonly CAPACITY = 10
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare capacity: number

  @column()
  declare courseId: number

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @hasMany(() => StudentRegister)
  declare studentRegister: HasMany<typeof StudentRegister>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static async createStudentClass(courseId: number): Promise<StudentClass> {
    const studentClass = new StudentClass()
    studentClass.courseId = courseId
    studentClass.capacity = this.CAPACITY
    return await studentClass.save()
  }
}
