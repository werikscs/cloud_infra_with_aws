/* eslint-disable no-param-reassign */
type User = {
  userId: string
  email: string
  username: string
  nickname: string
  password: string
}

type UserLogin = {
  email: string
  password: string
}

export const defaultUser = {
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

export const loginUserRoute = async (
  httpServer: any,
  userLoginData?: UserLogin,
) => {
  if (!userLoginData) {
    await createUserRoute(httpServer)
    userLoginData = {
      email: defaultUser.email,
      password: defaultUser.password,
    }
  }
  const response = await httpServer.post('/session/login').send(userLoginData)
  return {
    token: response.body.token,
  }
}
