import Joi from "joi";
import { AdminRole } from "../models/Admin";
import i18n from "../config/i18nConfig";

const allowedChars = /^[\p{L}\p{N}\s]*$/u;

const createAdminValidation = {
  body: Joi.object({
    name: Joi.object({
      en: Joi.string()
        .pattern(allowedChars)
        .required()
        .messages({
          "string.base": "The English name must be a string.",
          "string.pattern.base": i18n.__("validation.string_pattern_base", {
            field: "English name",
          }),
          "any.required": "The English name is required.",
        }),
      ar: Joi.string().pattern(allowedChars).required().messages({
        "string.base": "The Arabic name must be a string.",
        "string.pattern.base": "The Arabic name contains invalid characters.",
        "any.required": "The Arabic name is required.",
      }),
    })
      .required()
      .messages({
        "object.base":
          "The name must be an object with English and Arabic fields.",
      }),

    username: Joi.string().pattern(allowedChars).required().messages({
      "string.base": "The username must be a string.",
      "string.pattern.base": "The username contains invalid characters.",
      "any.required": "The username is required.",
    }),

    password: Joi.string().pattern(allowedChars).required().messages({
      "string.base": "The password must be a string.",
      "string.pattern.base": "The password contains invalid characters.",
      "any.required": "The password is required.",
    }),

    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "The email address is invalid.",
      "any.required": "The email address is required.",
      "string.empty": "The email address cannot be empty.",
    }),

    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        "string.base": "The phone number must be a string.",
        "string.pattern.base": "The phone number format is invalid.",
        "any.required": "The phone number is required.",
      }),

    role: Joi.string()
      .valid(...Object.values(AdminRole))
      .required()
      .messages({
        "string.base": "The role must be a string.",
        "any.required": "The role is required.",
        "any.only": "The role must be one of the predefined values.",
      }),
  }).required(),
};
const updateAdminValidation = {
  body: Joi.object({
    name: Joi.object({
      en: Joi.string()
        .pattern(allowedChars)
        .optional() // Optional for updates
        .messages({
          "string.base": "The English name must be a string.",
          "string.pattern.base": i18n.__("validation.string_pattern_base", {
            field: "English name",
          }),
        }),
      ar: Joi.string()
        .pattern(allowedChars)
        .optional() // Optional for updates
        .messages({
          "string.base": "The Arabic name must be a string.",
          "string.pattern.base": "The Arabic name contains invalid characters.",
        }),
    })
      .optional() // Optional for the entire name object
      .messages({
        "object.base":
          "The name must be an object with English and Arabic fields.",
      }),

    username: Joi.string()
      .pattern(allowedChars)
      .optional() // Optional for updates
      .messages({
        "string.base": "The username must be a string.",
        "string.pattern.base": "The username contains invalid characters.",
      }),

    password: Joi.string()
      .pattern(allowedChars)
      .optional() // Optional for updates
      .messages({
        "string.base": "The password must be a string.",
        "string.pattern.base": "The password contains invalid characters.",
      }),

    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .optional() // Optional for updates
      .messages({
        "string.email": "The email address is invalid.",
        "string.empty": "The email address cannot be empty.",
      }),

    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional() // Optional for updates
      .messages({
        "string.base": "The phone number must be a string.",
        "string.pattern.base": "The phone number format is invalid.",
      }),

    role: Joi.string()
      .valid(...Object.values(AdminRole))
      .optional() // Optional for updates
      .messages({
        "string.base": "The role must be a string.",
        "any.only": "The role must be one of the predefined values.",
      }),
  })
    .required()
    .unknown(false),
};

export { createAdminValidation, updateAdminValidation };
