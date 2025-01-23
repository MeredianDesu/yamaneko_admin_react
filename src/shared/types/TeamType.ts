import { type User } from 'entities/User'

export interface TeamType extends Pick<User, 'id' | 'username'> {
  id: string | number
  name: string
  user: {
    id: string | number
    username: string
  }
}
