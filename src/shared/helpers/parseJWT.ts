export const parseJWT = (token: string): string => {
  const base64Url: string = token.split('.')[1]
  const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  return decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c: string) => {
        const charCode = c.charCodeAt(0).toString(16)
        const paddedCharCode = `00${charCode}`.slice(-2)
        return `%${paddedCharCode}`
      })
      .join(''),
  )
}
