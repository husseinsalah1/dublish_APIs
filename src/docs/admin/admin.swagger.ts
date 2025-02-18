const adminPathRoute = "/v1/api/admin/";
export const adminSwagger = {
  [adminPathRoute + "create"]: {
    post: {
      summary: "Create a new admin",
      tags: ["Admin"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  properties: {
                    en: {
                      type: "string",
                      description: "Admin's name in English",
                      example: "Hussein",
                    },
                    ar: {
                      type: "string",
                      description: "Admin's name in Arabic",
                      example: "حسين",
                    },
                  },
                  required: ["en", "ar"],
                },
                username: {
                  type: "string",
                  description: "The admin's username",
                  example: "swaggerUsername",
                },
                email: {
                  type: "string",
                  description: "The admin's email address",
                  example: "exampleSwagger@swagger.com",
                },
                password: {
                  type: "string",
                  description: "The admin's password",
                  example: "123",
                },
                phone: {
                  type: "string",
                  description: "The admin's phone number",
                  example: "123456789",
                },
                role: {
                  type: "string",
                  description: "The admin's role",
                  example: "admin",
                },
                permissions: {
                  type: "string",
                  description: "The admin's permissions",
                  example: "66d36152899b4103a43f12b7",
                },
              },
              required: ["name", "username", "email", "password", "phone", "role", "permissions"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Admin created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  errorCode: {
                    type: "number",
                    example: 201,
                  },
                  result: {
                    type: "object",
                    description: "The admin data and token",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            description: "Admin's name in English",
                            example: "Hussein",
                          },
                          ar: {
                            type: "string",
                            description: "Admin's name in Arabic",
                            example: "حسين",
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        description: "Unique ID for the admin",
                        example: "66d35f39ded01db5cd25e231",
                      },
                      username: {
                        type: "string",
                        description: "Admin's username",
                        example: "husseinrm101",
                      },
                      email: {
                        type: "string",
                        description: "Admin's email address",
                        example: "admin@admin.com",
                      },
                      phone: {
                        type: "string",
                        description: "Admin's phone number",
                        example: "1112681772",
                      },
                      permissions: {
                        type: "string",
                        description: "ID referencing admin permissions",
                        example: "66d36152899b4103a43f12b7",
                      },
                      role: {
                        type: "string",
                        description: "Admin's role in the system",
                        example: "superAdmin",
                      },
                      creationDate: {
                        type: "string",
                        format: "date-time",
                        description: "Date when the admin was created",
                        example: "2024-08-30T19:16:22.297Z",
                      },
                      __v: {
                        type: "integer",
                        description: "Schema version number",
                        example: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Duplicate username or email",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Duplicate username or email",
                  },
                  errorCode: {
                    type: "number",
                    example: 409,
                  },
                  errors: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
        422: {
          description: "Invalid input",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Invalid input",
                  },
                  errorCode: {
                    type: "number",
                    example: 422,
                  },
                  errors: {
                    type: "object",
                    properties: {
                      "name.en": {
                        type: "string",
                        example: "Name in English is required",
                      },
                      "name.ar": {
                        type: "string",
                        example: "Name in Arabic is required",
                      },
                      username: {
                        type: "string",
                        example: "Username is required",
                      },
                      email: {
                        type: "string",
                        example: "Email is required",
                      },
                      password: {
                        type: "string",
                        example: "Password is required",
                      },
                      phone: {
                        type: "string",
                        example: "Phone is required",
                      },
                      role: {
                        type: "string",
                        example: "Role is required",
                      },
                      permissions: {
                        type: "string",
                        example: "Permissions is required",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  [adminPathRoute + "list"]: {
    get: {
      summary: "Get all admins",
      tags: ["Admin"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Admins fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  code: {
                    type: "number",
                    example: 200,
                  },
                  count: {
                    type: "number",
                    example: 1,
                  },
                  result: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "object",
                          properties: {
                            en: {
                              type: "string",
                              description: "Admin's name in English",
                              example: "Hussein",
                            },
                            ar: {
                              type: "string",
                              description: "Admin's name in Arabic",
                              example: "حسين",
                            },
                          },
                        },
                        _id: {
                          type: "string",
                          description: "Unique ID for the admin",
                          example: "66d35f39ded01db5cd25e231",
                        },
                        username: {
                          type: "string",
                          description: "Admin's username",
                          example: "husseinrm101",
                        },
                        email: {
                          type: "string",
                          description: "Admin's email address",
                          example: "salahhussein@gmail.com",
                        },
                        phone: {
                          type: "string",
                          description: "Admin's phone number",
                          example: "1112681772",
                        },
                        permissions: {
                          type: "string",
                          description: "ID referencing admin permissions",
                          example: "66d36152899b4103a43f12b7",
                        },
                        role: {
                          type: "string",
                          description: "Admin's role in the system",
                          example: "superAdmin",
                        },
                        creationDate: {
                          type: "string",
                          format: "date-time",
                          description: "Date when the admin was created",
                          example: "2024-08-30T19:16:22.297Z",
                        },
                        __v: {
                          type: "integer",
                          description: "Schema version number",
                          example: 0,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  [adminPathRoute + "get"]: {
    get: {
      summary: "Get admin by ID",
      tags: ["Admin"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          name: "_id",
          schema: {
            type: "string",
          },
          required: true,
          description: "Admin ID",
        },
      ],
      responses: {
        200: {
          description: "Admin fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    description: "Boolean indicating the success of the request",
                    example: true,
                  },
                  code: {
                    type: "number",
                    description: "HTTP status code",
                    example: 200,
                  },
                  result: {
                    type: "object",
                    description: "The admin data",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            description: "Admin's name in English",
                            example: "Hussein",
                          },
                          ar: {
                            type: "string",
                            description: "Admin's name in Arabic",
                            example: "حسين",
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        description: "Unique ID for the admin",
                        example: "66d35f39ded01db5cd25e231",
                      },
                      username: {
                        type: "string",
                        description: "Admin's username",
                        example: "husseinrm101",
                      },
                      email: {
                        type: "string",
                        description: "Admin's email address",
                        example: "salahhussein@gmail.com",
                      },
                      phone: {
                        type: "string",
                        description: "Admin's phone number",
                        example: "1112681772",
                      },
                      permissions: {
                        type: "string",
                        description: "ID referencing admin permissions",
                        example: "66d36152899b4103a43f12b7",
                      },
                      role: {
                        type: "string",
                        description: "Admin's role in the system",
                        example: "superAdmin",
                      },
                      creationDate: {
                        type: "string",
                        format: "date-time",
                        description: "Date when the admin was created",
                        example: "2024-08-30T19:16:22.297Z",
                      },
                      __v: {
                        type: "integer",
                        description: "Schema version number",
                        example: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Admin not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Admin not found",
                  },
                  errorCode: {
                    type: "number",
                    example: 404,
                  },
                  errors: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  [adminPathRoute + "delete"]: {
    delete: {
      summary: "Delete admin by ID",
      tags: ["Admin"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          name: "_id",
          schema: {
            type: "string",
          },
          required: true,
          description: "Admin ID",
        },
      ],
      responses: {
        200: {
          description: "Admin deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  code: {
                    type: "number",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Admin deleted successfully",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Admin not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Admin not found",
                  },
                  errorCode: {
                    type: "number",
                    example: 404,
                  },
                  errors: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid input",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Invalid input",
                  },
                  errorCode: {
                    type: "number",
                    example: 400,
                  },
                  errors: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "Invalid ID",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  [adminPathRoute + "update"]: {
    put: {
      summary: "Update admin by ID",
      tags: ["Admin"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          name: "_id",
          schema: {
            type: "string",
          },
          required: true,
          description: "Admin ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  description: "The admin's username",
                  example: "swaggerUsername",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Admin updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  code: {
                    type: "number",
                    example: 200,
                  },
                  result: {
                    type: "object",
                    description: "The updated admin data",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            description: "Admin's name in English",
                            example: "Hussein",
                          },
                          ar: {
                            type: "string",
                            description: "Admin's name in Arabic",
                            example: "حسين",
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        description: "Unique ID for the admin",
                        example: "66d35f39ded01db5cd25e231",
                      },
                      username: {
                        type: "string",
                        description: "Admin's username",
                        example: "swaggerUsername",
                      },
                      email: {
                        type: "string",
                        description: "Admin's email address",
                        example: "salahhussein176@gmail.com",
                      },

                      phone: {
                        type: "string",
                        description: "Admin's phone number",
                        example: "1112681772",
                      },
                      permissions: {
                        type: "string",
                        description: "ID referencing admin permissions",
                        example: "66d36152899b4103a43f12b7",
                      },
                      role: {
                        type: "string",
                        description: "Admin's role in the system",
                        example: "superAdmin",
                      },
                      creationDate: {
                        type: "string",
                        format: "date-time",
                        description: "Date when the admin was created",
                        example: "2024-08-30T19:16:22.297Z",
                      },
                      __v: {
                        type: "integer",
                        description: "Schema version number",
                        example: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Admin not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Admin not found",
                  },
                  errorCode: {
                    type: "number",
                    example: 404,
                  },
                  errors: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Duplicate username or email",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Duplicate username or email",
                  },
                  errorCode: {
                    type: "number",
                    example: 409,
                  },
                  errors: {
                    type: "null",
                    example: null,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
