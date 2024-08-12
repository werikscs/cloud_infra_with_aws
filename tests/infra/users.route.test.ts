import request from 'supertest'
import { app, prismaClient } from 'src'

describe('ROUTE: Users', () => {
  afterEach(async () => {
    await prismaClient.$connect()
    await prismaClient.user.deleteMany()
    await prismaClient.$disconnect()
  })

  describe('GET /users', () => {
    it('should return 200 and a empty list of users', async () => {
      const { status, body } = await request(app).get('/users')
      expect(status).toBe(200)
      expect(body.users).toEqual([])
    })

    it('should return 200 and a list of users', async () => {
      await request(app).post('/users').send({
        email: 'email1@emailcom',
        username: 'username1',
        nickname: 'nickname1',
        password: '1q2w3e4r5t',
      })
      await request(app).post('/users').send({
        email: 'email2@emailcom',
        username: 'username2',
        nickname: 'nickname2',
        password: '1q2w3e4r5t',
      })

      const { status, body } = await request(app).get('/users')
      expect(status).toBe(200)
      expect(body.users).toHaveLength(2)
    })
  })

  it('should return 201 and a new user', async () => {
    const { status, body } = await request(app).post('/users').send({
      email: 'email1@emailcom',
      username: 'username1',
      nickname: 'nickename1',
      password: '1q2w3e4r5t',
    })
    expect(status).toBe(201)
    expect(body).toStrictEqual({
      userId: expect.any(String),
      email: 'email1@emailcom',
      username: 'username1',
      nickname: 'nickename1',
    })
  })
})
