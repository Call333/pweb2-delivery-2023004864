import express from 'express';

import { EncomendaController } from '../controllers/EncomendaController.js';
import { EncomendaService } from '../services/EncomendaService.js';
import { EncomendaRepository } from '../repositories/EncomendaRepository.js';

import { database } from '../database/database.js';

const router = express.Router();

const encomendaRepository = new EncomendaRepository(database);
const encomendaService = new EncomendaService(encomendaRepository);
const encomendaController = new EncomendaController(encomendaService);

router.post('/entregas', encomendaController.criar);
router.get('/entregas', encomendaController.encontrarTodos);
router.patch('/entregas/:id/avancar', encomendaController.avancar);

export default router;