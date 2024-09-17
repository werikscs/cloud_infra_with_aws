export const swaggerSchemas = {
  CreateUserRequest: {
    type: 'object',
    properties: {
      username: { type: 'string', example: 'john_doe' },
      nickname: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'john@email.com' },
      password: { type: 'string', example: 'johnDoe123' },
    },
  },
  UserResponse: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid' },
      username: { type: 'string', example: 'john_doe' },
      nickname: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'john@email.com' },
    },
  },
}
