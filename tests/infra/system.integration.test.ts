import request from 'supertest'
import { app } from '@/src'

describe('ROUTE: System', async () => {
  it('should get 200 from healthcheck route', async () => {
    await request(app).get('/system/healthcheck').expect(200)
  })
})
