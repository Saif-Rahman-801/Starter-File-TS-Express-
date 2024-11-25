/* import Joi from 'joi';

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
 */


import { z } from 'zod';

// Define the Username schema
const UserNameZodSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can't be more than 20 characters")
    .refine(
      (value) => /^[A-Z][a-z]*$/.test(value),
      {
        message: "First name should be in capitalized format with the first letter uppercase",
      }
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: 'Last name should contain only alphabetical characters' })
    .min(1, 'Last name is required'),
});

// Define the Guardian information schema
const GuardianInfoZodSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.number().int().nonnegative('Contact number must be a positive integer'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.number().int().nonnegative('Contact number must be a positive integer'),
});

// Define the Local Guardian information schema
const LocalGuardianZodSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  contactNo: z.number().int().nonnegative('Contact number must be a positive integer'),
  address: z.string().min(1, 'Address is required'),
});

// Define the main Student schema
const StudentZodSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z.string().max(20),
  name: UserNameZodSchema,
  isDeleted: z.boolean(),
  gender: z
    .enum(['male', 'female', 'others'], {
      errorMap: () => ({ message: 'Gender can only be male, female, or others' }),
    }),
  email: z
    .string()
    .email('Must be a valid email')
    .min(1, 'Email is required'),
  avatar: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  contactNo: z.number().int().nonnegative('Contact number must be a positive integer'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z.string().optional(),
  presentAddress: z.string().min(1, 'Present address is required'),
  guardian: GuardianInfoZodSchema,
  localGuardian: LocalGuardianZodSchema,
  profileImg: z.string().min(1, 'Profile image is required'),
  isActive: z.enum(['active', 'inactive']).default('active'), // Default without `nonempty`
});

export default StudentZodSchema;

