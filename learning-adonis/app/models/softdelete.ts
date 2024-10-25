/* eslint-disable @typescript-eslint/no-shadow */
import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, column } from '@adonisjs/lucid/orm'
import { softDelete, softDeleteQuery } from '#services/softdelete'

export default class Base extends BaseModel {
  @column.dateTime({ serializeAs: null, columnName: 'deleted_at' })
  public deletedAt?: DateTime

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
