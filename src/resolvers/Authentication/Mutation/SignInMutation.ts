import { GraphQLError } from 'graphql'
import { Graph } from 'src/generated/graph'
import ContextType from 'src/graphql/ContextType'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { AuthenticationError } from 'apollo-server'

interface User {
  id?: number
  email?: string | null
  username?: string | null
  password?: string | null
  fullname?: string | null
  createdBy?: number | null
  phoneNumber?: number | null
  profilePicture?: string | null
}

export const SignInMutation = async (
  _,
  { input }: { input: Graph.SignInInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default

  const user: User = await knex
    .table('users')
    .where({
      email: input.email,
    })
    .first()

  if (input.password === '' && input.email === '') {
    throw new GraphQLError(
      `{"errorMessage": "Your email or password are empty", "typeError": "user_not_field_the_form"}`,
    )
  }

  if (user === undefined) {
    throw new GraphQLError(
      `{"errorMessage": "Your email or password is incorrect!", "typeError": "wrong_email_or_password"}`,
    )
  }

  const checkPassword = bcrypt.compareSync(input.password, user.password)
  if (user === undefined && !checkPassword) {
    throw new GraphQLError(
      `{"errorMessage": "Your email or password is incorrect!", "typeError": "wrong_email_or_password"}`,
    )
  }

  if (!checkPassword) {
    throw new GraphQLError(
      `{"errorMessage": "Your password is incorrect!", "typeError": "wrong_password"}`,
    )
  }

  const generateToken = crypto.randomBytes(64).toString('hex')

  const [loggedIn] = await knex.table('user_tokens').insert({
    user_id: user.id,
    token: generateToken,
  })

  if (loggedIn > 0) {
    return {
      token: generateToken,
    }
  } else {
    throw new AuthenticationError('Something went wrong')
  }
}
