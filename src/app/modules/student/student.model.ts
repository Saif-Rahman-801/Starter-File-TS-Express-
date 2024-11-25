import mongoose, { Model, model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardin,
  ModelOfStudent,
  ModelOfstuStatic,
  Student,
  StudentCustomMothods,
  Username,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt'
import config from '../../config';

const UserNameSchema = new Schema<Username>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, "first name can't be more than 20 characters"],
    /*  validate: {
      validator: function (str: string) {
        const firstNameStr = str.charAt(0).toUpperCase() + str.slice(1);
        return firstNameStr === str;
        // console.log(str); //value is the main value of first name
      },
      message:
        "{VALUE} IS NOT IN CAPITALIZED FORMAT , First letter of the name should be uppercase and other's should be in lowercase",
    }, */
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    /* validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: '{VALUE} should be in Alpha',
    }, */
  },
});

const GuardianInfoSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: Number, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: Number, required: true },
});

const LocalGuardianSchema = new Schema<LocalGuardin>({
  name: { type: String, required: true },
  contactNo: { type: Number, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<
  Student /* ModelOfStudent, StudentCustomMothods (These are for custom instances) */,
  ModelOfstuStatic
>({
  id: { type: String, unique: true },
  password: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "Can't be more than 20 charcters"]
  },
  name: {
    type: UserNameSchema,
    trim: true,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Gender field can only be the following',
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not in email format',
    },
  },
  avatar: { type: String },
  dateOfBirth: { type: String, required: true },
  contactNo: { type: Number, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String },
  presentAddress: { type: String, required: true },
  guardian: { type: GuardianInfoSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
  },
});


// Mongoose middleware
StudentSchema.pre("save", async function (next) {
  // console.log(this, "Pre saving data");
  // hashing password
const user = this

  user.password = await bcrypt.hash(user.password, Number(config.bycrypt_salt_rounds))
  next()
})

StudentSchema.post("save", function () {
  console.log(this, "post saving data");
  
})






// creating custom instance method
StudentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

// creating a custom static Method
StudentSchema.statics.isUserExiststwo = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

const StudentModel = model<Student, /* ModelOfStudent // it's for custom instance*/ ModelOfstuStatic>('Student', StudentSchema);
export default StudentModel;
