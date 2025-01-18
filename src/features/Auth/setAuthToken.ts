export const setAuthToken = (token: string) => {
  localStorage.setItem('accessToken', token)
}
