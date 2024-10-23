import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'course'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table
        .integer('producer_id')
        .unsigned()
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')
      table.string('title', 100).notNullable()
      table.text('description').notNullable().defaultTo('')
      table.string('poster_url', 255).notNullable().defaultTo('')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
