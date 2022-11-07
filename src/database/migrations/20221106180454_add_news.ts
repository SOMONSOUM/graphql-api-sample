import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('news'))) {
    return await knex.schema.createTable('news', function (table) {
      table.increments()
      table.string('title')
      table.text('summary', 'longtext')
      table.string('thumbnail')
      table.json('description')
      table
        .enum('status', ['PENDING', 'INREVIEW', 'REVERSION', 'PUBLISHED'])
        .defaultTo('PENDING')
      table.integer('new_category_id')
      table.integer('created_by')
      table.integer('updated_by')
      table.timestamps(true, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {}
