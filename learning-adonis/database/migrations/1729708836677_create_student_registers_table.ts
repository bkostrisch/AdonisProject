import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'student_registers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('student_id').unsigned().references('users.id').onDelete('CASCADE')
      table
        .integer('student_class_id')
        .unsigned()
        .references('student_classes.id')
        .onDelete('CASCADE')
      table.dateTime('expires_at').notNullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
