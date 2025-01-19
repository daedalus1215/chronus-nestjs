import * as Joi from "joi";

export const ValidationAdapter = {
    appy: (schema, items) => {
              const envSchema = Joi.object(schema).unknown();
            
              const { error, value: envVars } = envSchema.validate(items, {
                abortEarly: true,
              });
              console.log('error', error)
            
              if (error) {
                console.error("Environment variable validation error:", error.message);
                process
                .exit(1); // Exit if validation fails
              }
        return envVars;              
    }
}