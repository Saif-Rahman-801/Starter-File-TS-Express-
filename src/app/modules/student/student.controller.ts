import { Request, Response } from 'express';
import { createStudentIntoDb, getAllStudents } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await createStudentIntoDb(studentData);
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

export { createStudent, getAllStudentsFromDB };
