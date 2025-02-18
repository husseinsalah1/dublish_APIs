const adminPathRoute = "/v1/api/admin/";

export const authSwagger = {
  [adminPathRoute + "login"]: {
    post: {
      summary: "Admin login",
      tags: ["Admin"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The admin's email address",
                  example: "admin@admin.com",
                },
                password: {
                  type: "string",
                  description: "The admin's password",
                  example: "123",
                },
              },
              required: ["email", "password"], // Explicitly mark required fields
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful login",
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
                      token: {
                        type: "string",
                        description: "JWT token for authentication",
                        example: "eyJhbGciOi....",
                      },
                    },
                  },
                  token: {
                    type: "string",
                    description: "Duplicate JWT token for convenience",
                    example: "eyJhbGciOi....",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Admin not found or invalid password",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    description: "Indicates if the request was successful",
                    example: false,
                  },
                  message: {
                    type: "string",
                    description: "Error message describing the issue",
                    example: "Admin not found or invalid password",
                  },
                  errorCode: {
                    type: "number",
                    description: "HTTP status code representing the error",
                    example: 404,
                  },
                  errors: {
                    type: "null",
                    description: "Optional field for additional error details",
                    example: null,
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request - Validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    description: "Indicates if the request was successful",
                    example: false,
                  },
                  message: {
                    type: "string",
                    description: "Error message describing the validation issue",
                    example: "Invalid email or password",
                  },
                  errorCode: {
                    type: "number",
                    description: "HTTP status code representing the error",
                    example: 400,
                  },
                  errors: {
                    type: "array",
                    description: "Array of validation error messages",
                    items: {
                      type: "string",
                      example: "Email is required",
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
};
