import request from 'supertest'

import { PrismaDbConnection } from '@/src/dbConnection'
import { app } from '@/src'
import { createUserRoute, defaultUser, loginUserRoute } from './utils'

const httpServer = request(app)

describe('ROUTE: Users', async () => {
  const prismaClient = await PrismaDbConnection.getClient()

  beforeAll(async () => {
    await PrismaDbConnection.connect()
  })

  afterAll(async () => {
    await PrismaDbConnection.disconnect()
  })

  beforeEach(async () => {
    await prismaClient.user.deleteMany()
  })

  describe('POST /users', () => {
    it('should return 201 and a new user', async () => {
      const user = defaultUser
      const { status, body } = await httpServer.post('/users').send(user)

      expect(status).toBe(201)
      expect(body).toStrictEqual({
        userId: expect.any(String),
        email: user.email,
        username: user.username,
        nickname: user.nickname,
      })
    })
  })

  describe('GET /users', () => {
    it('should return 200 and a list with 1 user', async () => {
      const { token } = await loginUserRoute(httpServer)
      const { status, body } = await httpServer
        .get('/users')
        .set('Authorization', `Bearer ${token}`)

      expect(status).toBe(200)
      expect(body).toHaveLength(1)
    })

    it('should return 200 and a list of users', async () => {
      await createUserRoute(httpServer, {
        email: 'email1@email.com',
        username: 'username1',
        nickname: 'nickname1',
      })
      await createUserRoute(httpServer, {
        email: 'email2@email.com',
        username: 'username2',
        nickname: 'nickname2',
      })

      const { token } = await loginUserRoute(httpServer, {
        email: 'email1@email.com',
        password: defaultUser.password,
      })

      const { status, body } = await httpServer
        .get('/users')
        .set('Authorization', `Bearer ${token}`)

      expect(status).toBe(200)
      expect(body).toHaveLength(2)
      expect(body[0]).toStrictEqual({
        userId: expect.any(String),
        email: expect.any(String),
        username: expect.any(String),
        nickname: expect.any(String),
      })
    })

    it('should return 401 when getting users without authorization', async () => {
      const { status } = await httpServer.get('/users')
      expect(status).toBe(401)
    })
  })

  describe('GET /users/:userId', () => {
    it('should return 200 and a user', async () => {
      const user = defaultUser
      const { token, userId } = await loginUserRoute(httpServer)
      const gotUser = await httpServer
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(gotUser.status).toBe(200)
      expect(gotUser.body).toStrictEqual({
        userId,
        email: user.email,
        username: user.username,
        nickname: user.nickname,
      })
    })

    it('should return 401 when getting user by id without authorization', async () => {
      const createdUser = await createUserRoute(httpServer)
      const gotUser = await httpServer.get(`/users/${createdUser.body.userId}`)
      expect(gotUser.status).toBe(401)
    })
  })
})
