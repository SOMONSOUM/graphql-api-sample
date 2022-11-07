import { Graph } from 'src/generated/graph'
import ContextType from 'src/graphql/ContextType'
import bcrypt from 'bcryptjs'
import { AuthenticationError } from 'apollo-server'

export const AdminUpdateUserMutation = async (
  _,
  { id, input }: { id: number; input: Graph.UserInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default

  const updateUser = await knex
    .table('users')
    .update({
      email: input?.email ? input?.email : undefined,
      username: input?.username ? input?.username : undefined,
      fullname: input?.fullname ? input?.fullname : undefined,
      phone_number: input?.phoneNumber ? input?.phoneNumber : undefined,
      profile_picture: input?.profilePicture,
    })
    .where({ id })

  if (updateUser) {
    return updateUser > 0
  } else {
    throw new AuthenticationError('Something went wrong')
  }
}
