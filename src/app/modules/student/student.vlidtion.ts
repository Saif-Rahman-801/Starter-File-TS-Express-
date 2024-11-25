import Joi from 'joi';

const UserNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, 'capitalized format')
    .messages({
      'string.pattern.base': '{#label} should be capitalized with the first letter uppercase',
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/, 'alpha')
    .required()
    .messages({
      'string.pattern.base': '{#label} should contain only alphabetical characters',
      'string.empty': 'Last name is required',
    }),
});

const GuardianInfoJoiSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.number().integer().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.number().integer().required(),
});

const LocalGuardianJoiSchema = Joi.object({
  name: Joi.string().required(),
  contactNo: Joi.number().integer().required(),
  address: Joi.string().required(),
});

const StudentJoiSchema = Joi.object({
  id: Joi.string().required(),
  name: UserNameJoiSchema.required(),
  gender: Joi.string()
    .valid('male', 'female', 'others')
    .required()
    .messages({
      'any.only': 'Gender can only be male, female, or others',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '{#label} must be a valid email',
      'string.empty': 'Email is required',
    }),
  avatar: Joi.string().optional(),
  dateOfBirth: Joi.string().isoDate().required(),
  contactNo: Joi.number().integer().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().optional(),
  presentAddress: Joi.string().required(),
  guardian: GuardianInfoJoiSchema.required(),
  localGuardian: LocalGuardianJoiSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .required(),
});

export default StudentJoiSchema;
