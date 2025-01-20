export enum systemMessages {
  // auth messages
  SUCCESS_LOGIN = 'Successful login',
  LOGOUT = 'You were logged out',
  BAD_LOGIN = 'Something went wrong...',
  BAD_CREDENTIALS = 'Wrong credentials',
  FORBIDDEN = 'You do not have access rights to this resource',
  FORBIDDEN_USER = 'User is not authenticated',

  // auth provider messages
  EXTERNAL_USAGE = 'useAuth must be used within an AuthProvider',

  // tokens
  NO_TOKEN = 'Token is missing',

  // fetching
  FETCH_ERROR = 'Error while fetching',
}
