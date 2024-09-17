export const swaggerSystemPaths = {
  '/system/healthcheck': {
    get: {
      tags: ['system'],
      summary: 'System healthcheck',
      description: 'Check if the API is up and running',
      responses: {
        200: {
          description: 'Sucessful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'Ok',
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
