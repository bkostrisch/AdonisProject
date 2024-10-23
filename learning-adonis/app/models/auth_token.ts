import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { DateTime } from 'luxon'

export default class AuthToken extends BaseModel {
  public static readonly CONFIRMATION_TOKEN: number = 1
  public static readonly ACCESS_TOKEN: number = 2
  public static readonly EMAIL_SUBJECT = 'Acesse a aplicação'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare token: string

  @column()
  declare type: number

  @column.dateTime({ autoCreate: true })
  declare expiresAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime
}
