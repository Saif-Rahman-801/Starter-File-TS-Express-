import express from 'express';
import {
  createStudent,
  deleteAStudentFromDB,
  getAllStudentsFromDB,
  getAStudentFromDB,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/all-students', getAllStudentsFromDB);
router.get('/:id', getAStudentFromDB);
router.delete('/:id', deleteAStudentFromDB);

export const StudentRoutes = router;
