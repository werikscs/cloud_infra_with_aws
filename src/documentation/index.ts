import { swaggerSchemas } from './components/schemas'
import { swaggerSecuritySchemes } from './components/securitySchemes'
import { swaggerSessionPaths } from './paths/session'
import { swaggerSystemPaths } from './paths/system'
import { swaggerUserPaths } from './paths/user'
import { swaggerTags } from './tags'

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'API',
    description: 'API description',
  },
  tags: [...swaggerTags],
  paths: {
    ...swaggerSessionPaths,
    ...swaggerSystemPaths,
    ...swaggerUserPaths,
  },
  components: {
    swaggerSchemas,
    swaggerSecuritySchemes,
  },
}
