import express from 'express';

import { EncomendaController } from '../controllers/EncomendaController.js';

import { EncomendaService } from '../services/EncomendaService.js';

import { EncomendaRepository } from '../repositories/EncomendaRepository.js';
import { MotoristaRepository } from '../repositories/MotoristaRepository.js';
import { SqlEncomendaRepository } from '../repositories/SqlEncomendaRepository.js';
import { SqlMotoristaRepository } from '../repositories/SqlMotoristaRepository.js';

import { database } from '../database/database.js';

import { EncomendaModel } from '../database/models/EncomendaModel.js';
import { MotoristaModel } from '../database/models/MotoristaModel.js';

const router = express.Router();

const encomendaRepository = new SqlEncomendaRepository(EncomendaModel);
const motoristaRepository = new SqlMotoristaRepository(MotoristaModel);
const encomendaService = new EncomendaService(encomendaRepository, motoristaRepository);
const encomendaController = new EncomendaController(encomendaService);

router.post('/entregas', encomendaController.criar);

router.get('/entregas', encomendaController.encontrarTodos);
router.get('/entregas/nova', encomendaController.formCadastrarEncomenda);
router.get('/entregas/:id/historico', encomendaController.buscarHistorico);
router.get('/entregas/:id', encomendaController.encontrarUmaEncomenda);

router.patch('/entregas/:id/avancar', encomendaController.avancar);
router.patch('/entregas/:id/cancelar', encomendaController.cancelar);
router.patch('/entregas/:id/atribuir', encomendaController.atribuirMotorista);

export default router;