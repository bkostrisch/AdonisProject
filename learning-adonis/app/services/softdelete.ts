import { BaseModel } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull(`${query.model.table}.deleted_at`)
}

export const softDelete = async (row: any, column: string = 'deletedAt') => {
  row[column] = DateTime.local()
  await row.save()
  return
}
