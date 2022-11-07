import { Graph } from 'src/generated/graph'
import ContextType from 'src/graphql/ContextType'
import bcrypt from 'bcryptjs'
import { AuthenticationError } from 'apollo-server'

export const AdminCreateUserMutation = async (
  _,
  { input }: { input: Graph.UserInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default
  await ctx.authUser.loginRequired('USER')

  const [createUser] = await knex.table('users').insert({
    email: input?.email ? input?.email : undefined,
    username: input?.username ? input?.username : undefined,
    password: input?.password
      ? bcrypt.hashSync(input?.password, 12)
      : undefined,
    fullname: input?.fullname ? input?.fullname : undefined,
    phone_number: input?.phoneNumber ? input?.phoneNumber : undefined,
    profile_picture: input?.profilePicture,
  })

  if (createUser) {
    await knex.table('role_permissions').insert({
      user_id: Number(createUser),
      role_id: 1,
    })

    return true
  } else {
    throw new AuthenticationError(`You can't do that!`)
  }
}
