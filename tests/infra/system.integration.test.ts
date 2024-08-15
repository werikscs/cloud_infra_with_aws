import request from 'supertest'
import { app } from '../../src'

it('should get 200 from healthcheck route', async () => {
  await request(app).get('/system/healthcheck').expect(200)
})
