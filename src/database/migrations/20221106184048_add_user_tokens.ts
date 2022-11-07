import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user_tokens'))) {
    return await knex.schema.createTable('user_tokens', function (table) {
      table.increments()
      table.text('token', 'longtext')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {}
