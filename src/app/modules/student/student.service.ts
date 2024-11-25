import StudentModel from './student.model';
import { Student } from './student.interface';

const createStudentIntoDb = async (student: Student) => {
  const studentIns = new StudentModel(student);
  if (await studentIns.isUserExists(student.id)) {
    throw new Error("Student already exists");
    
  }
  const responseData = await StudentModel.create(student);
  return responseData;
};

const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudent = async (studentId: string) => {
  const result = await StudentModel.findOne({ studentId: studentId });
  return result;
};

export { createStudentIntoDb, getAllStudents, getSingleStudent };
