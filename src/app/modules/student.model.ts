import mongoose, { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardin,
  Student,
  Username,
} from './student/student.interface';

const UserNameSchema = new Schema<Username>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
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

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: UserNameSchema,
  gender: { type: String, enum: ['male', 'female'], required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  dateOfBirth: { type: String, required: true },
  contactNo: { type: Number, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String },
  presentAddress: { type: String, required: true },
  guardian: GuardianInfoSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: { type: String, required: true },
  isActive: { type: String, enum: ['active', 'inactive'], required: true },
});

// export default mongoose.model<Student>('Student', StudentSchema);

const StudentModel = model<Student>('Student', StudentSchema);
export default StudentModel;
