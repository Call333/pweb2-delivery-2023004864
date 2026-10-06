import express from 'express';

import { EncomendaController } from '../controllers/EncomendaController.js';
import { EncomendaService } from '../services/EncomendaService.js';
import { EncomendaRepository } from '../repositories/EncomendaRepository.js';

import { database } from '../database/database.js';
import { MotoristaRepository } from '../repositories/MotoristaRepository.js';

const router = express.Router();

const encomendaRepository = new EncomendaRepository(database);
const motoristaRepository = new MotoristaRepository(database);
const encomendaService = new EncomendaService(encomendaRepository, motoristaRepository);
const encomendaController = new EncomendaController(encomendaService);

router.post('/entregas', encomendaController.criar);

router.get('/entregas', encomendaController.encontrarTodos);
router.get('/entregas/:id/historico', encomendaController.buscarHistorico);
router.get('/entregas/:id', encomendaController.encontrarUmaEncomenda);

router.patch('/entregas/:id/avancar', encomendaController.avancar);
router.patch('/entregas/:id/cancelar', encomendaController.cancelar);
router.patch('/entregas/:id/atribuir', encomendaController.atribuirMotorista);

export default router;