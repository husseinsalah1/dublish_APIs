const coursePathRoute = "/v1/api/course/";

export const courseSwagger = {
  [coursePathRoute + "create"]: {
    post: {
      summary: "Create a new course",
      tags: ["Course"],
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
                      description: "The course name in English",
                      example: "Web Development",
                    },
                    ar: {
                      type: "string",
                      description: "The course name in Arabic",
                      example: "تطوير الويب",
                    },
                  },
                },
                description: {
                  type: "object",
                  properties: {
                    en: {
                      type: "string",
                      description: "The course description in English",
                      example: "Learn how to build web applications",
                    },
                    ar: {
                      type: "string",
                      description: "The course description in Arabic",
                      example: "تعلم كيفية بناء تطبيقات الويب",
                    },
                  },
                },
                type: {
                  type: "string",
                  description: "The course type",
                  example: "online",
                },
                about: {
                  type: "object",
                  properties: {
                    en: {
                      type: "array",
                      description: "The course details in English",
                      items: {
                        type: "string",
                        example: "Learn how to build web applications",
                      },
                    },
                    ar: {
                      type: "array",
                      description: "The course details in Arabic",
                      items: {
                        type: "string",
                        example: "تعلم كيفية بناء تطبيقات الويب",
                      },
                    },
                  },
                },
                category: {
                  type: "object",
                  properties: {
                    en: {
                      type: "string",
                      description: "The course category in English",
                      example: "Development",
                    },
                    ar: {
                      type: "string",
                      description: "The course category in Arabic",
                      example: "تطوير",
                    },
                  },
                },
                hours: {
                  type: "number",
                  description: "The course duration in hours",
                  example: 10,
                },
                duration: {
                  type: "object",
                  properties: {
                    en: {
                      type: "string",
                      description: "The course duration in English",
                      example: "10 hours",
                    },
                    ar: {
                      type: "string",
                      description: "The course duration in Arabic",
                      example: "10 ساعات",
                    },
                  },
                },
                classes: {
                  type: "number",
                  description: "The number of classes in the course",
                  example: 10,
                },
                price: {
                  type: "number",
                  description: "The course price",
                  example: 100,
                },
                isHasOffer: {
                  type: "boolean",
                  description: "The course has an offer",
                  example: false,
                },
                image: {
                  type: "string",
                  description: "The course image",
                  example: "https://www.example.com/image.jpg",
                },
              },
              required: ["name", "description", "price", "duration", "hours", "type", "about", "category", "classes", "image", "isHasOffer"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Course created successfully",
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
                    example: 201,
                  },
                  result: {
                    type: "object",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Web Development",
                          },
                          ar: {
                            type: "string",
                            example: "تطوير الويب",
                          },
                        },
                      },
                      description: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Learn how to build web applications",
                          },
                          ar: {
                            type: "string",
                            example: "تعلم كيفية بناء تطبيقات الويب",
                          },
                        },
                      },
                      type: {
                        type: "string",
                        example: "online",
                      },
                      about: {
                        type: "object",
                        properties: {
                          en: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "Learn how to build web applications",
                            },
                          },
                          ar: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "تعلم كيفية بناء تطبيقات الويب",
                            },
                          },
                        },
                      },
                      category: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Development",
                          },
                          ar: {
                            type: "string",
                            example: "تطوير",
                          },
                        },
                      },
                      hours: {
                        type: "number",
                        example: 10,
                      },
                      duration: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "10 hours",
                          },
                          ar: {
                            type: "string",
                            example: "10 ساعات",
                          },
                        },
                      },
                      classes: {
                        type: "number",
                        example: 10,
                      },
                      price: {
                        type: "number",
                        example: 100,
                      },
                      isHasOffer: {
                        type: "boolean",
                        example: false,
                      },
                      image: {
                        type: "string",
                        example: "https://www.example.com/image.jpg",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Course name already exists",
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
                    example: "Course name already exists",
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
  [coursePathRoute + "list"]: {
    get: {
      summary: "Get all courses",
      tags: ["Course"],
      responses: {
        200: {
          description: "Courses fetched successfully",
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
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "object",
                          properties: {
                            en: {
                              type: "string",
                              example: "Web Development",
                            },
                            ar: {
                              type: "string",
                              example: "تطوير الويب",
                            },
                          },
                        },
                        description: {
                          type: "object",
                          properties: {
                            en: {
                              type: "string",
                              example: "Learn how to build web applications",
                            },
                            ar: {
                              type: "string",
                              example: "تعلم كيفية بناء تطبيقات الويب",
                            },
                          },
                        },
                        type: {
                          type: "string",
                          example: "online",
                        },
                        about: {
                          type: "object",
                          properties: {
                            en: {
                              type: "array",
                              items: {
                                type: "string",
                                example: "Learn how to build web applications",
                              },
                            },
                            ar: {
                              type: "array",
                              items: {
                                type: "string",
                                example: "تعلم كيفية بناء تطبيقات الويب",
                              },
                            },
                          },
                        },
                        category: {
                          type: "object",
                          properties: {
                            en: {
                              type: "string",
                              example: "Development",
                            },
                            ar: {
                              type: "string",
                              example: "تطوير",
                            },
                          },
                        },
                        hours: {
                          type: "number",
                          example: 10,
                        },
                        duration: {
                          type: "object",
                          properties: {
                            en: {
                              type: "string",
                              example: "10 hours",
                            },
                            ar: {
                              type: "string",
                              example: "10 ساعات",
                            },
                          },
                        },
                        classes: {
                          type: "number",
                          example: 10,
                        },
                        price: {
                          type: "number",
                          example: 100,
                        },
                        isHasOffer: {
                          type: "boolean",
                          example: false,
                        },
                        image: {
                          type: "string",
                          example: "https://www.example.com/image.jpg",
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
  [coursePathRoute + "get"]: {
    get: {
      summary: "Get course by id",
      tags: ["Course"],
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
          description: "The course id",
        },
      ],
      responses: {
        200: {
          description: "Course fetched successfully",
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
                    description: "The course details",
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Web Development",
                          },
                          ar: {
                            type: "string",
                            example: "تطوير الويب",
                          },
                        },
                      },
                      description: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Learn how to build web applications",
                          },
                          ar: {
                            type: "string",
                            example: "تعلم كيفية بناء تطبيقات الويب",
                          },
                        },
                      },
                      type: {
                        type: "string",
                        example: "online",
                      },
                      about: {
                        type: "object",
                        properties: {
                          en: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "Learn how to build web applications",
                            },
                          },
                          ar: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "تعلم كيفية بناء تطبيقات الويب",
                            },
                          },
                        },
                      },
                      category: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Development",
                          },
                          ar: {
                            type: "string",
                            example: "تطوير",
                          },
                        },
                      },
                      hours: {
                        type: "number",
                        example: 10,
                      },
                      duration: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "10 hours",
                          },
                          ar: {
                            type: "string",
                            example: "10 ساعات",
                          },
                        },
                      },
                      classes: {
                        type: "number",
                        example: 10,
                      },
                      price: {
                        type: "number",
                        example: 100,
                      },
                      isHasOffer: {
                        type: "boolean",
                        example: false,
                      },
                      image: {
                        type: "string",
                        example: "https://www.example.com/image.jpg",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Course not found",
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
                    example: "Course not found",
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
  [coursePathRoute + "delete"]: {
    delete: {
      summary: "Delete course by ID",
      tags: ["Course"],
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
          description: "Course ID",
        },
      ],
      responses: {
        200: {
          description: "Course deleted successfully",
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
                    example: "Course deleted successfully",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Course not found",
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
                    example: "Course not found",
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
  [coursePathRoute + "update"]: {
    put: {
      summary: "Update course by ID",
      tags: ["Course"],
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
          description: "Course ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                "name.en": {
                  type: "string",
                  description: "The course's name.en",
                  example: "swaggerNameInEnglish",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Course updated successfully",
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
                    properties: {
                      name: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "swaggerNameInEnglish",
                          },
                          ar: {
                            type: "string",
                            example: "تطوير الويب",
                          },
                        },
                      },
                      description: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Learn how to build web applications",
                          },
                          ar: {
                            type: "string",
                            example: "تعلم كيفية بناء تطبيقات الويب",
                          },
                        },
                      },
                      type: {
                        type: "string",
                        example: "online",
                      },
                      about: {
                        type: "object",
                        properties: {
                          en: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "Learn how to build web applications",
                            },
                          },
                          ar: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "تعلم كيفية بناء تطبيقات الويب",
                            },
                          },
                        },
                      },
                      category: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "Development",
                          },
                          ar: {
                            type: "string",
                            example: "تطوير",
                          },
                        },
                      },
                      hours: {
                        type: "number",
                        example: 10,
                      },
                      duration: {
                        type: "object",
                        properties: {
                          en: {
                            type: "string",
                            example: "10 hours",
                          },
                          ar: {
                            type: "string",
                            example: "10 ساعات",
                          },
                        },
                      },
                      classes: {
                        type: "number",
                        example: 10,
                      },
                      price: {
                        type: "number",
                        example: 100,
                      },
                      isHasOffer: {
                        type: "boolean",
                        example: false,
                      },
                      image: {
                        type: "string",
                        example: "https://www.example.com/image.jpg",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Course not found",
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
                    example: "Course not found",
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
};
