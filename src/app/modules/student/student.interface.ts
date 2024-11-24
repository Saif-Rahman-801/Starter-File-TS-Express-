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
  middleName?: string;
  lastName: string;
};

export type LocalGuardin = {
  name: string;
  occupation: string;
  address: string;
  contactNo: Number;
};

export type Student = {
  id: string;
  name: Username;
  gender: 'male' | 'female';
  email: string;
  avatar?: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: string;
  presentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardin;
  profileImg: string;
  isActive: 'active' | 'inactive';
};
