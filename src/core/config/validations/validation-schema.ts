import Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'local', 'prod').required(),

  SERVER_PORT: Joi.number().required(),
  SERVER_REFRESH_TOKEN_COOKIE_MAX_AGE: Joi.number().required(),

  MYSQL_HOST: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_TCP_PORT: Joi.number().required(),
  MYSQL_TIME_ZONE: Joi.string().required(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),

  BCRYPT_PASSWORD_SALT: Joi.number().required(),
  BCRYPT_REFRESH_TOKEN_SALT: Joi.number().required(),
});
