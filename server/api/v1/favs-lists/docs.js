const { paginatorQueryParamsDocs } = require('../../../pagination.middleware');
const { sortingQueryParamsDocs } = require('../../../sorting.middleware');
const { favsListSortingFields } = require('./favs-list.entity');

exports.favsListsPaths = {
  '/favs': {
    get: {
      tags: ['favs-lists'],
      summary: 'Get favs lists',
      description: 'Get favs lists',
      operationId: 'listFavsLists',
      security: [{ Bearer: [] }],
      parameters: [
        ...paginatorQueryParamsDocs,
        ...sortingQueryParamsDocs(favsListSortingFields),
      ],
      responses: {
        200: {
          description: 'Successful favs lists retrieval',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/FavsList',
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description:
                      'Detailed description of the issues with the request',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized user',
        },
        500: {
          description: 'Unexpected error',
        },
      },
    },
    post: {
      tags: ['favs-lists'],
      summary: 'Create a favs list',
      description: 'Create a favs list',
      operationId: 'createFavsList',
      security: [{ Bearer: [] }],
      requestBody: {
        description: 'Favs list to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NewFavsList',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successful favs list creation',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FavsList',
              },
            },
          },
        },
        401: {
          description: 'Unauthorized user',
        },
        500: {
          description: 'Unexpected error',
        },
      },
    },
  },
  '/favs/{id}': {
    get: {
      tags: ['favs-lists'],
      summary: 'Get a favs list',
      description: 'Get a favs list',
      operationId: 'getFavsList',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the favs list to retrieve',
          required: true,
          schema: {
            type: 'string',
            format: 'objectid',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful favs list retrieval',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FavsList',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description:
                      'Detailed description of the issues with the request',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized user',
        },
        404: {
          description: 'Favs list not found',
        },
        500: {
          description: 'Unexpected error',
        },
      },
    },
    delete: {
      tags: ['favs-lists'],
      summary: 'Remove a favs list',
      description: 'Remove a favs list',
      operationId: 'removeFavsList',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the favs list to remove',
          required: true,
          schema: {
            type: 'string',
            format: 'objectid',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful favs list removal',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FavsList',
              },
            },
          },
        },
        400: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description:
                      'Detailed description of the issues with the request',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized user',
        },
        404: {
          description: 'Favs list not found',
        },
        500: {
          description: 'Unexpected error',
        },
      },
    },
  },
  // TODO: Add favs list items documentation.
  // '/favs/{listId}/items': {},
};

exports.favsListsSchemas = {
  NewFavsList: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
    required: ['name'],
  },
  FavsList: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        format: 'objectid',
      },
      name: {
        type: 'string',
      },
      itemsCount: {
        type: 'integer',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
};
