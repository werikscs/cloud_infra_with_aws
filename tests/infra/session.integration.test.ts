import request from 'supertest'
import { app } from '@/src'
import { PrismaDbConnection } from '@/src/PrismaDbConnection'
import { createUserRoute } from './utils'

const httpServer = request(app)

describe('ROUTE: Session', async () => {
  const connection = PrismaDbConnection.getPrismaDbConnection()

  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(async () => {
    await connection.getDbClient().user.deleteMany()
  })

  describe('POST /login', () => {
    it('should return 200 and a token', async () => {
      const user = {
        email: 'a@email.com',
        username: 'aaa',
        nickname: 'bbb',
        password: '123',
      }
      await createUserRoute(httpServer, user)
      const { status, body } = await httpServer.post('/session/login').send({
        email: user.email,
        password: user.password,
      })
      expect(status).toBe(200)
      expect(body).toHaveProperty('token')
    })
  })
})
