import request from 'supertest'
import { app } from 'src'

it('should get 200 from healthcheck route', () => {
  return request(app).get('/healthcheck').expect(200)
})
