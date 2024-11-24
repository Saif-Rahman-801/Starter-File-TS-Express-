import { Request, Response } from 'express';
import { createStudentIntoDb } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const result = await createStudentIntoDb(studentData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result
    });
  } catch (error) {
    console.log(error);
    
  }
};

export { createStudent };
