import * as Joi from "joi";
import { ValidationAdapter } from "../validator/validation.adapter";

export const environmentVariableValidation = () => ValidationAdapter.appy({
        APP_PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
        COGNITO_USER_POOL_ID: Joi.string().required(),
        COGNITO_CLIENT_ID: Joi.string().required(),
        COGNITO_REGION: Joi.string().required(),
        COGNITO_ISSUER: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        DATABASE: Joi.string().required(),
        DATABASE_TYPE: Joi.string().required(),
    }, 
    process.env);
