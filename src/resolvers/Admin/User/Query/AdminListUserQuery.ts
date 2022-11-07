import ContextType from 'src/graphql/ContextType'

export const AdminListUserQuery = async (_, {}: {}, ctx: ContextType) => {
  const knex = ctx.knex.default

  const userQuery = knex
    .table('users')
    .innerJoin('role_permissions', 'users.id', 'role_permissions.user_id')
    .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
    .select(
      'users.id as id',
      'users.email as email',
      'users.fullname as fullname',
      'users.username as username',
      'users.phone_number as phoneNumber',
      'users.profile_picture as profilePicture',
      'roles.name as roleName',
    )

  const users = await userQuery

  return {
    data: users.map((x) => {
      return {
        ...x,
      }
    }),
  }
}
