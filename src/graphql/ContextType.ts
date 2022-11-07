import { Knex } from 'knex'

export interface AuthUserInterface {
  id: number
  token: string
  read?: boolean | null
  write?: boolean | null
  modify?: boolean | null
  remove?: boolean | null
}

export interface AuthUser {
  user?: AuthUserInterface
  loginRequired: (type: string) => Promise<boolean>
}

export default interface ContextType {
  knex: {
    default: Knex
  }
  authUser: AuthUser
  token: string
}
