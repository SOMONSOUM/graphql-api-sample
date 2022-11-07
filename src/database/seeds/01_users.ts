import { Knex } from 'knex'
import bcrypt from 'bcryptjs'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      email: 'superadmin@admin.com',
      username: 'admin',
      password: bcrypt.hashSync('123', 12),
      fullname: 'Super Admin',
      phone_number: '099999444',
      profile_picture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },

    {
      email: 'user@user.com',
      username: 'user',
      password: bcrypt.hashSync('123', 12),
      fullname: 'User',
      phone_number: '099999333',
      profile_picture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },
  ])

  // Deletes ALL existing entries
  await knex('roles').del()

  // Inserts seed entries
  await knex('roles').insert([
    {
      name: 'Super Admin',
      status: true,
      read: true,
      write: true,
      modify: true,
      remove: true,
    },
    {
      name: 'User',
      status: true,
      read: true,
      write: false,
      modify: false,
      remove: false,
    },
  ])

  // Deletes ALL existing entries
  await knex('role_permissions').del()

  // Inserts seed entries
  await knex('role_permissions').insert([
    {
      user_id: 1,
      role_id: 1,
    },
    {
      user_id: 2,
      role_id: 2,
    },
  ])
}
