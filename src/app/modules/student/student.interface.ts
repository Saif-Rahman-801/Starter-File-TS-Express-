import { Model } from "mongoose";

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: Number;
  motherName: string;
  motherOccupation: string;
  motherContactNo: Number;
};

export type Username = {
  firstName: string;
  middleName?: string|undefined;
  lastName: string;
};

export type LocalGuardin = {
  name: string;
  occupation?: string;
  address: string;
  contactNo: Number;
};

export type Student = {
  id: string;
  name: Username;
  gender: 'male' | 'female' | 'others';
  email: string;
  avatar?: string;
  dateOfBirth: string;
  contactNo: number;
  emergencyContactNo: string;
  bloodGroup?: string;
  presentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardin;
  profileImg: string;
  isActive: 'active' | 'inactive';
};

// Declaring type for custom mongoose instance
export type StudentCustomMothods = {
  isUserExists(id: string): Promise<Student | null>
}


export type ModelOfStudent = Model<Student, {}, StudentCustomMothods>
