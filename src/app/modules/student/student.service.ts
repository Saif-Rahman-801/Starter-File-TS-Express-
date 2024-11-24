import StudentModel from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const responseData = await StudentModel.create(student);
  return responseData;
};

const getAllStudents = async () => {
    const result = await StudentModel.find();
    return result
}

export { createStudentIntoDb, getAllStudents };
