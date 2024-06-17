import express from 'express';

const router = express.Router();
import { getData } from '../controllers/getData.js';

router.get('/data', getData)

export default router;