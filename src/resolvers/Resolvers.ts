import { AdminCreateUserMutation } from './Admin/User/Mutation/AdminCreateUserMutation'
import { AdminRemoveUserMutation } from './Admin/User/Mutation/AdminRemoveUserMutation'
import { AdminUpdateUserMutation } from './Admin/User/Mutation/AdminUpdateUserMutation'
import { AdminListUserQuery } from './Admin/User/Query/AdminListUserQuery'
import { SignInMutation } from './Authentication/Mutation/SigninMutation'
import { SignOutMutation } from './Authentication/Mutation/SignOutMutation'
import { AdminMeQuery } from './Authentication/Query/AdminMeQuery'

const AppResolvers = [
  {
    Query: {
      testing: () => {
        return 'Hello World'
      },
      adminMe: AdminMeQuery,
      adminListUser: AdminListUserQuery,
    },
    Mutation: {
      testing: () => {
        return true
      },
      signIn: SignInMutation,
      signOut: SignOutMutation,
      adminCreateUser: AdminCreateUserMutation,
      adminUpdateUser: AdminUpdateUserMutation,
      adminRemoveUser: AdminRemoveUserMutation,
    },
  },
]

export default AppResolvers
