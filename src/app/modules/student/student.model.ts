import mongoose, { model, Schema } from 'mongoose';
import { Guardian, LocalGuardin, ModelOfStudent, Student, StudentCustomMothods, Username } from './student.interface';
import validator from 'validator';

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

const StudentSchema = new Schema<Student, ModelOfStudent, StudentCustomMothods>({
  id: { type: String, unique: true },
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

// export default mongoose.model<Student>('Student', StudentSchema);
StudentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({id})
  return existingUser
}


const StudentModel = model<Student, ModelOfStudent>('Student', StudentSchema);
export default StudentModel;
