import { ApolloServer, AuthenticationError } from 'apollo-server'
import { Knex } from 'knex'
import AppResolvers from '../resolvers/Resolvers'
import ContextType, { AuthUser } from './ContextType'
import createKnexContext from './CreateKnexContext'
import extractRequestToken from './ExtractRequestToken'
import SchemaLoader from './SchemaLoader'

const LoginRequired = async (
  type: string,
  knex: Knex,
  token: string,
): Promise<boolean> => {
  if (type === 'USER') {
    const res = await knex
      .table('users')
      .innerJoin('user_tokens', 'users.id', 'user_tokens.user_id')
      .select('users.id', 'users.email')
      .where({ token: token })
      .first()

    if (res) {
      return true
    } else {
      throw new AuthenticationError(
        `{"errorMessage":"You don't have permission!", "typeError":"permission"}`,
      )
    }
  }
}

export default function createApolloServer() {
  const knexConnectionList = createKnexContext()

  return new ApolloServer({
    cors: true,
    playground: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
    typeDefs: SchemaLoader(),
    resolvers: AppResolvers,

    context: async ({ req }): Promise<ContextType> => {
      const knex = knexConnectionList.default
      const token = extractRequestToken(req)

      const authUser: AuthUser = {
        loginRequired: async (type: string) => LoginRequired(type, knex, token),
      }

      if (token) {
        const user = await knex
          .table('user_tokens')
          .innerJoin(
            'role_permissions',
            'role_permissions.user_id',
            'user_tokens.user_id',
          )
          .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
          .select(
            'user_tokens.user_id as user_id',
            'roles.write as write',
            'roles.read as read',
            'roles.modify as modify',
            'roles.remove as remove',
          )
          .where({ token: token })
          .first()

        if (user) {
          authUser.user = {
            id: user.user_id,
            token: token,
            read: user.read,
            write: user.write,
            modify: user.modify,
            remove: user.remove,
          }
        } else {
          throw new AuthenticationError('Incorrect Token!!')
        }
      }

      return {
        knex: knexConnectionList,
        authUser,
        token,
      }
    },
  })
}
