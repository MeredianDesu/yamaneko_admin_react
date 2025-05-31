export interface IUser {
  id: number | string
  username: string
  password: string // TODO(): need to be deleted in a future
  email: string
  roles: string[]
  avatar: string
  createdAt: string
}
