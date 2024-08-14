type User = {
  userId: string
  email: string
  username: string
  nickname: string
  password: string
}

export const defaultUser: Partial<User> = {
  email: 'default_email@email.com',
  username: 'default_username',
  nickname: 'default_nickname',
  password: 'default_password',
}

export const createUserRoute = async (
  httpServer: any,
  userData: Partial<User> = defaultUser,
) => {
  const response = await httpServer.post('/users').send({
    ...defaultUser,
    ...userData,
  })
  return response
}
