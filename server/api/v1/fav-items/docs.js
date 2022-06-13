const { paginatorQueryParamsDocs } = require('../../../pagination.middleware');
const { sortingQueryParamsDocs } = require('../../../sorting.middleware');
const { favItemSortingFields } = require('./fav-item.entity');

exports.favItemsPaths = {
  '/fav-items': {
    get: {
      tags: ['fav-items'],
      summary: 'Get fav items',
      description: 'Get fav items',
      operationId: 'listFavItems',
      security: [{ Bearer: [] }],
      parameters: [
        ...paginatorQueryParamsDocs,
        ...sortingQueryParamsDocs(favItemSortingFields),
      ],
      responses: {
        200: {
          description: 'Successful fav items retrieval',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/FavItem',
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
      tags: ['fav-items'],
      summary: 'Create a fav item',
      description: 'Create a fav item',
      operationId: 'createFavItem',
      security: [{ Bearer: [] }],
      requestBody: {
        description: 'Fav item to create',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NewFavItem',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successful fav item creation',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FavItem',
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
  '/fav-items/{id}': {
    get: {
      tags: ['fav-items'],
      summary: 'Get a fav item',
      description: 'Get a fav item',
      operationId: 'getFavItem',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the fav item to retrieve',
          required: true,
          schema: {
            type: 'string',
            format: 'objectid',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful fav item retrieval',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FavItem',
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
          description: 'Fav item not found',
        },
        500: {
          description: 'Unexpected error',
        },
      },
    },
    patch: {
      tags: ['fav-items'],
      summary: 'Edit a fav item',
      description: 'Edit a fav item',
      operationId: 'editFavItem',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the fav item to edit',
          required: true,
          schema: {
            type: 'string',
            format: 'objectid',
          },
        },
      ],
      requestBody: {
        description: 'Edited fav item',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/EditedFavItem',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful fav item edition',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FavItem',
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
          description: 'Fav item not found',
        },
        500: {
          description: 'Unexpected error',
        },
      },
    },
    delete: {
      tags: ['fav-items'],
      summary: 'Remove a fav item',
      description: 'Remove a fav item',
      operationId: 'removeFavItem',
      security: [{ Bearer: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the fav item to remove',
          required: true,
          schema: {
            type: 'string',
            format: 'objectid',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful fav item removal',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FavItem',
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
          description: 'Fav item not found',
        },
        500: {
          description: 'Unexpected error',
        },
      },
    },
  },
};

exports.favItemSchemas = {
  NewFavItem: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      link: {
        type: 'string',
        format: 'uri',
      },
      list: {
        type: 'string',
        format: 'objectid',
      },
    },
    required: ['title', 'description', 'link', 'list'],
  },
  EditedFavItem: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      link: {
        type: 'string',
        format: 'uri',
      },
      list: {
        type: 'string',
        format: 'objectid',
      },
    },
  },
  FavItem: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        format: 'objectid',
      },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      link: {
        type: 'string',
        format: 'uri',
      },
      list: {
        type: 'string',
        format: 'objectid',
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
