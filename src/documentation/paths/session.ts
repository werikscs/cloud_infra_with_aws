export const swaggerSessionPaths = {
  '/session/login': {
    post: {
      tags: ['session'],
      summary: 'System login',
      description: 'Authenticate user and return a JWT token',
      requestBody: {
        description: 'User credentials',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'john@email.com' },
                password: { type: 'string', example: 'johnDoe123' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Sucessful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    format: 'jwt',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
