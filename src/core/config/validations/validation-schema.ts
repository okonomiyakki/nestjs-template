import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'local', 'prod').required(),
  SERVER_PORT: Joi.number().required(),
  SERVER_REFRESH_TOKEN_COOKIE_MAX_AGE: Joi.number().required(),
});
