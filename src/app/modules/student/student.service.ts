import StudentModel from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const responseData = await StudentModel.create(student);
  return responseData;
};

export { createStudentIntoDb };
