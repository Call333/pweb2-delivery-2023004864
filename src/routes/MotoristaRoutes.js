import express from 'express';

import { MotoristaController } from '../controllers/MotoristaController.js';
import { MotoristaService } from '../services/MotoristaService.js';
import { MotoristaRepository } from '../repositories/MotoristaRepository.js';

import { database } from '../database/database';


const router = express.Router();

const motoristaRepository = new MotoristaRepository(database);
const motoristaService = new MotoristaService(motoristaRepository);
const motoristaController = new MotoristaController(motoristaService);

router.post('/motorista', motoristaController.criar);

export default router;