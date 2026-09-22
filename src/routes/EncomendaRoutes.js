import express from 'express';

import { EncomendaController } from '../controllers/EncomendaController';
import { EncomendaService } from '../services/EncomendaService';
import { EncomendaRepository } from '../repositories/EncomendaRepository';

import { database } from '../database/database';

const router = express.Router();

const encomendaRepository = new EncomendaRepository(database);
const encomendaService = new EncomendaService(encomendaRepository);
const encomendaController = new EncomendaController(encomendaService);

router.post('entregas', encomendaController.criar);

export default router;