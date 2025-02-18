const studentPathRoute = "/v1/api/admin/students/";
export const studentSwagger = {
  [studentPathRoute + "create"]: {
    post: {
      summary: "Create a new student",
      tags: ["Student"],
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
                      description: "student's name in English",
                      example: "Hussein",
                    },
                    ar: {
                      type: "string",
                      description: "student's name in Arabic",
                      example: "حسين",
                    },
                  },
                  required: ["en", "ar"],
                },
                email: {
                  type: "string",
                  description: "The student's email address",
                  example: "exampleSwagger@swagger.com",
                },
                password: {
                  type: "string",
                  description: "The student's password",
                  example: "123",
                },
                phone: {
                  type: "string",
                  description: "The student's phone number",
                  example: "123456789",
                },
                role: {
                  type: "string",
                  description: "The student's role",
                  example: "student",
                },
                birthDate: {
                  type: "string",
                  description: "The student's birth date",
                  example: "1999-12-12",
                },
              },
              required: ["name", "username", "email", "password", "phone", "role", "birthDate"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Student created successfully",
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
                    description: "The student data and token",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            description: "Student's name in English",
                            example: "Hussein",
                          },
                          ar: {
                            type: "string",
                            description: "Student's name in Arabic",
                            example: "حسين",
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        description: "Unique ID for the student",
                        example: "66d35f39ded01db5cd25e231",
                      },
                      email: {
                        type: "string",
                        description: "student's email address",
                        example: "student@student.com",
                      },
                      phone: {
                        type: "string",
                        description: "Student's phone number",
                        example: "1112681772",
                      },
                      role: {
                        type: "string",
                        description: "Student's role in the system",
                        example: "student",
                      },
                      creationDate: {
                        type: "string",
                        format: "date-time",
                        description: "Date when the student was created",
                        example: "2024-08-30T19:16:22.297Z",
                      },
                      birthDate: {
                        type: "string",
                        description: "The student's birth date",
                        example: "1999-12-12",
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
          description: "Duplicate email",
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
                    example: "Duplicate email",
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
                      birthDate: {
                        type: "string",
                        example: "Birth date is required",
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
  [studentPathRoute + "list"]: {
    get: {
      summary: "Get all students",
      tags: ["Student"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Students fetched successfully",
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
                              description: "Student's name in English",
                              example: "Hussein",
                            },
                            ar: {
                              type: "string",
                              description: "Student's name in Arabic",
                              example: "حسين",
                            },
                          },
                        },
                        _id: {
                          type: "string",
                          description: "Unique ID for the student",
                          example: "66d35f39ded01db5cd25e231",
                        },
                        email: {
                          type: "string",
                          description: "Student's email address",
                          example: "salahhussein@gmail.com",
                        },
                        phone: {
                          type: "string",
                          description: "Student's phone number",
                          example: "1112681772",
                        },
                        birthDate: {
                          type: "string",
                          description: "The student's birth date",
                          example: "1999-12-12",
                        },
                        role: {
                          type: "string",
                          description: "Student's role in the system",
                          example: "student",
                        },
                        creationDate: {
                          type: "string",
                          format: "date-time",
                          description: "Date when the student was created",
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
  [studentPathRoute + "get"]: {
    get: {
      summary: "Get student by ID",
      tags: ["Student"],
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
          description: "Student ID",
        },
      ],
      responses: {
        200: {
          description: "Student fetched successfully",
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
                    description: "The student data",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            description: "Student's name in English",
                            example: "Hussein",
                          },
                          ar: {
                            type: "string",
                            description: "Student's name in Arabic",
                            example: "حسين",
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        description: "Unique ID for the student",
                        example: "66d35f39ded01db5cd25e231",
                      },
                      email: {
                        type: "string",
                        description: "Student's email address",
                        example: "salahhussein@gmail.com",
                      },
                      phone: {
                        type: "string",
                        description: "Student's phone number",
                        example: "1112681772",
                      },
                      birthDate: {
                        type: "string",
                        description: "The student's birth date",
                        example: "1999-12-12",
                      },
                      role: {
                        type: "string",
                        description: "Student's role in the system",
                        example: "student",
                      },
                      creationDate: {
                        type: "string",
                        format: "date-time",
                        description: "Date when the student was created",
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
          description: "Student not found",
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
                    example: "Student not found",
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
  [studentPathRoute + "delete"]: {
    delete: {
      summary: "Delete student by ID",
      tags: ["Student"],
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
          description: "Student ID",
        },
      ],
      responses: {
        200: {
          description: "Student deleted successfully",
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
                    example: "Student deleted successfully",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Student not found",
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
                    example: "Student not found",
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
  [studentPathRoute + "update"]: {
    put: {
      summary: "Update student by ID",
      tags: ["Student"],
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
          description: "Student ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The student's email",
                  example: "swaggerEmail",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Student updated successfully",
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
                    description: "The updated student data",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            description: "Student's name in English",
                            example: "Hussein",
                          },
                          ar: {
                            type: "string",
                            description: "Student's name in Arabic",
                            example: "حسين",
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        description: "Unique ID for the student",
                        example: "66d35f39ded01db5cd25e231",
                      },
                      birthDate: {
                        type: "string",
                        description: "The student's birth date",
                        example: "1999-12-12",
                      },

                      email: {
                        type: "string",
                        description: "Student's email address",
                        example: "salahhussein176@gmail.com",
                      },

                      phone: {
                        type: "string",
                        description: "Student's phone number",
                        example: "1112681772",
                      },

                      role: {
                        type: "string",
                        description: "Student's role in the system",
                        example: "student",
                      },
                      creationDate: {
                        type: "string",
                        format: "date-time",
                        description: "Date when the student was created",
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
          description: "Student not found",
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
                    example: "Student not found",
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
          description: "Duplicate email",
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
                    example: "Duplicate email",
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
