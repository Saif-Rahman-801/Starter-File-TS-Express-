import express from 'express';
import { createStudent, getAllStudentsFromDB } from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);
router.get('/all-students', getAllStudentsFromDB);

export const StudentRoutes = router;
