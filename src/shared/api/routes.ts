const PROTOCOL = 'https://'
const ADDRESS = 'yamaneko.isn.one'
// const PORT = ':8443/'
const API_VER = '/v1'

export const BASE_URL = `${PROTOCOL}${ADDRESS}/api`

export const LOGIN = `/auth${API_VER}/login`
export const REGISTER = `/auth${API_VER}/register`
export const REFRESH = `/auth${API_VER}/refresh`

export const RELEASES = `/releases${API_VER}`
export const CHARACTERS = `/characters${API_VER}`
export const TEAM = `/team${API_VER}`
export const GENRES = `/genres${API_VER}`
