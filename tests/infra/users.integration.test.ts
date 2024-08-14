import request from 'supertest'
import { app, prismaClient } from 'src'
import { createUserRoute, defaultUser } from './utils'

const httpServer = request(app)

describe('ROUTE: Users', () => {
  beforeAll(async () => {
    await prismaClient.$connect()
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
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
    it('should return 200 and a empty list of users', async () => {
      const { status, body } = await httpServer.get('/users')

      expect(status).toBe(200)
      expect(body).toHaveLength(0)
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

      const { status, body } = await httpServer.get('/users')

      expect(status).toBe(200)
      expect(body).toHaveLength(2)
    })
  })

  describe('GET /users/:userId', () => {
    it('should return 200 and a user', async () => {
      const user = defaultUser
      const { body } = await createUserRoute(httpServer)

      const { userId } = body
      const { status, body: body2 } = await httpServer.get(`/users/${userId}`)

      expect(status).toBe(200)
      expect(body2).toStrictEqual({
        userId,
        email: user.email,
        username: user.username,
        nickname: user.nickname,
      })
    })
  })
})
