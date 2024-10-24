import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.integer('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')
      table.string('title', 100).notNullable()
      table.string('slug', 200).notNullable().unique()
      table.text('description').notNullable().defaultTo('')
      table.string('poster_url', 255).notNullable().defaultTo('')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
