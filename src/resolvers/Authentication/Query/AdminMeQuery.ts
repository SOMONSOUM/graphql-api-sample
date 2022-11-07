import { AuthenticationError } from 'apollo-server'
import ContextType from 'src/graphql/ContextType'

export const AdminMeQuery = async (
  _,
  { token }: { token: string },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default

  if (token) {
    const queryMe = knex
      .table('user_tokens')
      .innerJoin('users', 'users.id', 'user_tokens.user_id')
      .innerJoin('role_permissions', 'role_permissions.user_id', 'users.id')
      .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
      .select(
        'users.id as id',
        'users.email as email',
        'users.username as username',
        'users.fullname as fullname',
        'users.phone_number as phoneNumber',
        'users.profile_picture as profilePicture',
        'roles.id as roleId',
        'roles.name as roleName',
      )
      .where({ token })
      .first()

    const me = await queryMe
    const access = await knex
      .table('roles')
      .select('read', 'write', 'modify', 'remove')
      .where({ id: me?.roleId })
      .first()

    if (!me) {
      throw new AuthenticationError(
        `Please contact your admin to add you to system!`,
      )
    }

    return {
      ...me,
      roleAccess: {
        ...access,
      },
    }
  }

  return null
}
