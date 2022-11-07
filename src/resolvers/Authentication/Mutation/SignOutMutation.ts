import { AuthenticationError } from 'apollo-server'
import ContextType from 'src/graphql/ContextType'

export const SignOutMutation = async (
  _,
  { token }: { token: string },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default

  const signOut = await knex.table('user_tokens').where({ token }).del()

  if (signOut) {
    return true
  } else {
    throw new AuthenticationError('Something went wrong')
  }
}
