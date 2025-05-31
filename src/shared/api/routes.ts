const PROTOCOL = 'https://'
const ADDRESS = 'yamaneko.isn.one'
// const PORT = ':8443/'
const API_VER1 = '/v1'
const API_VER2 = '/v2'

export const BASE_URL = `${PROTOCOL}${ADDRESS}/api`
export const LOCAL_URL = 'http://localhost:8080/api'
export const MASCOT = `${PROTOCOL}${ADDRESS}/files/mascot.jfif`

export const LOGIN = `/auth${API_VER1}/login`
export const REGISTER = `/auth${API_VER1}/register`
export const REFRESH = `/auth${API_VER1}/refresh`

export const RELEASES = `/releases${API_VER2}`
export const CHARACTERS = `/characters${API_VER1}`
export const TEAM = `/team${API_VER1}`
export const GENRES = `/genres${API_VER1}`
export const USERS = `/users${API_VER1}`

export const GETPRESIGNEDURL = '/files/v2/pre-signed-url'
