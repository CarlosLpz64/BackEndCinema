import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TUsuarios extends BaseSchema {
  protected tableName = 't_usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('puesto').notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
