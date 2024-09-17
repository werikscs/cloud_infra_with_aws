export const swaggerUserPaths = {
  '/users': {
    post: {
      tags: ['user'],
      summary: 'Create user',
      description: 'Create a new user',
      requestBody: {
        description: 'User data',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/swaggerSchemas/CreateUserRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'User created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/swaggerSchemas/UserResponse' },
            },
          },
        },
      },
    },
    get: {
      tags: ['user'],
      security: [{ bearerAuth: [] }],
      summary: 'List users',
      description: 'List all users',
      responses: {
        200: {
          description: 'Sucessful response',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/swaggerSchemas/UserResponse' },
              },
            },
          },
        },
      },
    },
  },
  '/users/{userId}': {
    get: {
      tags: ['user'],
      security: [{ bearerAuth: [] }],
      summary: 'Get user',
      description: 'Get user by id',
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      responses: {
        200: {
          description: 'Sucessful response',
          content: {
            'application/json': {
              schema: { $ref: '#/components/swaggerSchemas/UserResponse' },
            },
          },
        },
      },
    },
  },
}
