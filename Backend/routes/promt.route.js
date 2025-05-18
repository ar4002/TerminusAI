import express from 'express';
import { sendPromt}  from '../controller/promt.controller.js';


const router = express.Router();

router.post("/promt",sendPromt);


export default router; 