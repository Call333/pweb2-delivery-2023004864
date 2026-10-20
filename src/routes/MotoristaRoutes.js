import express from 'express';

import { MotoristaController } from '../controllers/MotoristaController.js';
import { MotoristaService } from '../services/MotoristaService.js';

import { EncomendaRepository } from '../repositories/EncomendaRepository.js';
import { MotoristaRepository } from '../repositories/MotoristaRepository.js';

import { SqlEncomendaRepository } from '../repositories/SqlEncomendaRepository.js';
import { SqlMotoristaRepository } from '../repositories/SqlMotoristaRepository.js';

import { database } from '../database/database.js';

import { EncomendaModel } from '../database/models/EncomendaModel.js';
import { MotoristaModel } from '../database/models/MotoristaModel.js';

const router = express.Router();

const motoristaRepository = new SqlMotoristaRepository(MotoristaModel);
const encomendaRepository = new SqlEncomendaRepository(EncomendaModel);
const motoristaService = new MotoristaService(motoristaRepository, encomendaRepository);
const motoristaController = new MotoristaController(motoristaService);

router.post('/motoristas', motoristaController.criar);

router.get('/motoristas', motoristaController.encontrarTodos);
router.get('/motoristas/:id', motoristaController.encontrarMotorista);
router.get('/motoristas/:id/entregas', motoristaController.encontrarEntregas);
export default router;