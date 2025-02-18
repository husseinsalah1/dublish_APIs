import { Options } from "swagger-jsdoc";
import { swaggerDefinitions } from "../docs/swagger-docs";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dublish Institute API Documentation",
      version: "1.0.0",
      description: "API documentation for the Dublish Institute",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional
        },
      },
    },

    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    paths: swaggerDefinitions.paths, // Use imported paths
  },

  apis: ["./src/routes/*.ts"],
};
