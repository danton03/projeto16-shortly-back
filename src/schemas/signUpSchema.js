import joi from 'joi';

const signUpSchema = joi.object({
  name: joi.string().trim().min(1).max(30).required(),
  email: joi.string().email().required(), 
  password: joi.string().trim().min(4).max(30).required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
});

export { signUpSchema };