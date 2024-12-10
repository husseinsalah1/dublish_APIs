import Joi from "joi";
import i18n from "../config/i18nConfig";

const allowedChars = /^[\p{L}\p{N}\s]*$/u;

const createCourseValidation = {
  body: Joi.object({
    name: Joi.object({
      en: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "English course name is required",
        "any.required": "English course name is required",
        "string.pattern.base": "English course name contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "Arabic course name is required",
        "any.required": "Arabic course name is required",
        "string.pattern.base": "Arabic course name contains invalid characters",
      }),
    })
      .required()
      .messages({
        "any.required": "Course name is required",
        "object.base": "Course name must be an object",
      }),

    description: Joi.object({
      en: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "English course description is required",
        "any.required": "English course description is required",
        "string.pattern.base": "English course description contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "Arabic course description is required",
        "any.required": "Arabic course description is required",
        "string.pattern.base": "Arabic course description contains invalid characters",
      }),
    })
      .required()
      .messages({
        "any.required": "Course description is required",
        "object.base": "Course description must be an object",
      }),

    about: Joi.object({
      en: Joi.array()
        .items(
          Joi.string().pattern(allowedChars).messages({
            "string.empty": "English about section cannot be empty",
            "string.pattern.base": "English about section contains invalid characters",
          })
        )
        .optional()
        .messages({
          "array.base": "English about section must be an array",
        }),
      ar: Joi.array()
        .items(
          Joi.string().pattern(allowedChars).messages({
            "string.empty": "Arabic about section cannot be empty",
            "string.pattern.base": "Arabic about section contains invalid characters",
          })
        )
        .optional()
        .messages({
          "array.base": "Arabic about section must be an array",
        }),
    })
      .optional()
      .messages({
        "object.base": "About section must be an object",
      }),

    image: Joi.object().optional().messages({
      "object.base": "Image must be an object",
    }),

    category: Joi.object({
      en: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "English category is required",
        "any.required": "English category is required",
        "string.pattern.base": "English category contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "Arabic category is required",
        "any.required": "Arabic category is required",
        "string.pattern.base": "Arabic category contains invalid characters",
      }),
    })
      .required()
      .messages({
        "any.required": "Course category is required",
        "object.base": "Course category must be an object",
      }),

    hours: Joi.number().required().messages({
      "number.base": "Course hours must be a number",
      "any.required": "Course hours are required",
    }),

    duration: Joi.object({
      en: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "English duration is required",
        "any.required": "English duration is required",
        "string.pattern.base": "English duration contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).required().messages({
        "string.empty": "Arabic duration is required",
        "any.required": "Arabic duration is required",
        "string.pattern.base": "Arabic duration contains invalid characters",
      }),
    })
      .required()
      .messages({
        "any.required": "Course duration is required",
        "object.base": "Course duration must be an object",
      }),

    classes: Joi.number().required().messages({
      "number.base": "Number of classes must be a number",
      "any.required": "Number of classes is required",
    }),

    attends: Joi.number().optional().default(0).messages({
      "number.base": "Attendees number must be a number",
      "any.required": "Number of attendees is required",
    }),

    price: Joi.number().required().messages({
      "number.base": "Price must be a number",
      "any.required": "Price is required",
    }),

    isHasOffer: Joi.boolean().required().messages({
      "boolean.base": "isHasOffer must be a boolean value",
      "any.required": "isHasOffer is required",
    }),

    offerPercentage: Joi.number().when("isHasOffer", {
      is: true,
      then: Joi.number().required().messages({
        "number.base": "Offer percentage must be a number",
        "any.required": "Offer percentage is required if there is an offer",
      }),
      otherwise: Joi.number().optional(),
    }),

    offerDuration: Joi.object({
      start: Joi.date().when("isHasOffer", {
        is: true,
        then: Joi.date().required().messages({
          "date.base": "Offer start date must be a valid date",
          "any.required": "Offer start date is required if there is an offer",
        }),
        otherwise: Joi.date().optional(),
      }),
      end: Joi.date().when("isHasOffer", {
        is: true,
        then: Joi.date().required().messages({
          "date.base": "Offer end date must be a valid date",
          "any.required": "Offer end date is required if there is an offer",
        }),
        otherwise: Joi.date().optional(),
      }),
    })
      .optional()
      .messages({
        "object.base": "Offer duration must be an object",
      }),

    creationDate: Joi.date()
      .optional()
      .default(() => new Date())
      .messages({
        "date.base": "Creation date must be a valid date",
      }),
  })
    .required()
    .unknown(false),
};

const updateCourseValidation = {
  body: Joi.object({
    name: Joi.object({
      en: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "English course name cannot be empty",
        "string.pattern.base": "English course name contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "Arabic course name cannot be empty",
        "string.pattern.base": "Arabic course name contains invalid characters",
      }),
    })
      .optional()
      .messages({
        "object.base": "Course name must be an object",
      }),

    description: Joi.object({
      en: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "English course description cannot be empty",
        "string.pattern.base": "English course description contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "Arabic course description cannot be empty",
        "string.pattern.base": "Arabic course description contains invalid characters",
      }),
    })
      .optional()
      .messages({
        "object.base": "Course description must be an object",
      }),

    about: Joi.object({
      en: Joi.array()
        .items(
          Joi.string().pattern(allowedChars).messages({
            "string.empty": "English about section cannot be empty",
            "string.pattern.base": "English about section contains invalid characters",
          })
        )
        .optional()
        .messages({
          "array.base": "English about section must be an array",
        }),
      ar: Joi.array()
        .items(
          Joi.string().pattern(allowedChars).messages({
            "string.empty": "Arabic about section cannot be empty",
            "string.pattern.base": "Arabic about section contains invalid characters",
          })
        )
        .optional()
        .messages({
          "array.base": "Arabic about section must be an array",
        }),
    })
      .optional()
      .messages({
        "object.base": "About section must be an object",
      }),

    image: Joi.object().optional().messages({
      "object.base": "Image must be an object",
    }),

    category: Joi.object({
      en: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "English category cannot be empty",
        "string.pattern.base": "English category contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "Arabic category cannot be empty",
        "string.pattern.base": "Arabic category contains invalid characters",
      }),
    })
      .optional()
      .messages({
        "object.base": "Course category must be an object",
      }),

    hours: Joi.number().optional().messages({
      "number.base": "Course hours must be a number",
    }),

    duration: Joi.object({
      en: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "English duration cannot be empty",
        "string.pattern.base": "English duration contains invalid characters",
      }),
      ar: Joi.string().pattern(allowedChars).optional().messages({
        "string.empty": "Arabic duration cannot be empty",
        "string.pattern.base": "Arabic duration contains invalid characters",
      }),
    })
      .optional()
      .messages({
        "object.base": "Course duration must be an object",
      }),

    classes: Joi.number().optional().messages({
      "number.base": "Number of classes must be a number",
    }),

    attends: Joi.number().optional().messages({
      "number.base": "Attendees number must be a number",
    }),

    price: Joi.number().optional().messages({
      "number.base": "Price must be a number",
    }),

    isHasOffer: Joi.boolean().optional().messages({
      "boolean.base": "isHasOffer must be a boolean value",
    }),

    offerPercentage: Joi.number().when("isHasOffer", {
      is: true,
      then: Joi.number().optional().messages({
        "number.base": "Offer percentage must be a number",
      }),
      otherwise: Joi.number().optional(),
    }),

    offerDuration: Joi.object({
      start: Joi.date().when("isHasOffer", {
        is: true,
        then: Joi.date().optional().messages({
          "date.base": "Offer start date must be a valid date",
        }),
        otherwise: Joi.date().optional(),
      }),
      end: Joi.date().when("isHasOffer", {
        is: true,
        then: Joi.date().optional().messages({
          "date.base": "Offer end date must be a valid date",
        }),
        otherwise: Joi.date().optional(),
      }),
    })
      .optional()
      .messages({
        "object.base": "Offer duration must be an object",
      }),

    creationDate: Joi.date().optional().messages({
      "date.base": "Creation date must be a valid date",
    }),
  })
    .optional()
    .unknown(false),
};

export { createCourseValidation, updateCourseValidation };
