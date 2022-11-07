import { AuthenticationError } from 'apollo-server'
import ContextType from 'src/graphql/ContextType'

export const AdminRemoveUserMutation = async (
  _,
  { id }: { id: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default

  const removeUser = await knex.table('users').where({ id }).del()

  if (removeUser) {
    return true
  } else {
    throw new AuthenticationError('Something went wrong')
  }
}
