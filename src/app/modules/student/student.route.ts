import express from 'express';
import {
  createStudent,
  getAllStudentsFromDB,
  getAStudentFromDB,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/all-students', getAllStudentsFromDB);
router.get('/:id', getAStudentFromDB);

export const StudentRoutes = router;
