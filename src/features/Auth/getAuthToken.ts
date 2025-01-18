export const getAuthToken = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
  }
}
