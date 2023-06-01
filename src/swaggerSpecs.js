import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./utils";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentatoin",
      version: "1.0.0",
    },
  },
  apis__: [`${__dirname}/docs/*.yaml`],
};

export const swaggerSetup = swaggerJSDoc(swaggerOptions);
