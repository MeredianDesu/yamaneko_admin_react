import { parseJWT } from './parseJWT'

export const getRoles = (token: string): string => JSON.parse(parseJWT(token)).roles
