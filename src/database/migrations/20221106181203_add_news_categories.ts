import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('news_categories'))) {
    return await knex.schema.createTable('news_categories', function (table) {
      table.increments()
      table.string('name')
      table.integer('created_by')
      table.integer('updated_by')
      table.timestamps(true, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {}
