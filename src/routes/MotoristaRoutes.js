import express from 'express';

import { MotoristaController } from '../controllers/MotoristaController.js';
import { MotoristaService } from '../services/MotoristaService.js';
import { MotoristaRepository } from '../repositories/MotoristaRepository.js';

import { database } from '../database/database.js';
import { EncomendaRepository } from '../repositories/EncomendaRepository.js';


const router = express.Router();

const motoristaRepository = new MotoristaRepository(database);
const encomendaRepository = new EncomendaRepository(database);
const motoristaService = new MotoristaService(motoristaRepository, encomendaRepository);
const motoristaController = new MotoristaController(motoristaService);

router.post('/motoristas', motoristaController.criar);

router.get('/motoristas', motoristaController.encontrarTodos);
router.get('/motoristas/:id', motoristaController.encontrarMotorista);
router.get('/motoristas/:id/entregas', motoristaController.encontrarEntregas);
export default router;