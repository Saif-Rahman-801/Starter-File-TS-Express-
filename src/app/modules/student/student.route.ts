import express from 'express';
import { createStudent } from './student.controller';

const router = express.Router();

router.post('/createAPost', createStudent);
