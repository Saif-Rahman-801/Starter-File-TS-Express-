import { Request, Response } from 'express';
import {
  createStudentIntoDb,
  getAllStudents,
  getSingleStudent,
} from './student.service';
import { z } from 'zod';
import StudentZodSchema from './student.vlidtion';
// import StudentJoiSchema from './student.vlidtion';

const createStudent = async (req: Request, res: Response) => {
  try {

    const { student: studentData } = req.body;

    const zodValidatedData = StudentZodSchema.parse(studentData)

    // const { error, value } = StudentJoiSchema.validate(studentData);

    // console.log(error, value);
    

    const result = await createStudentIntoDb(zodValidatedData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudentsFromDB = async (req: Request, res: Response) => {
  try {
    const allStudents = await getAllStudents();
    res.status(200).json({
      success: true,
      message: 'All students loaded',
      data: allStudents,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAStudentFromDB = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);

    const result = await getSingleStudent(id);
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'A student loaded',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createStudent, getAllStudentsFromDB, getAStudentFromDB };
