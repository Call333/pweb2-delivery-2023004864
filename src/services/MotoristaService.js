import { Motorista } from "../model/Motorista.js";
import { ConflictError } from "../utils/errors/ConflictError.js";
import { NotFoundError } from "../utils/errors/NotFoundError.js";
import { ValidationError } from "../utils/errors/ValidationError.js";

export class MotoristaService {
    constructor(motoristaRepository, encomendaRepository) {
        this.motoristaRepository = motoristaRepository;
        this.encomendaRepository = encomendaRepository;
    }

    async criarMotorista(dadosMotorista) {
        const motoristaValidacao = new Motorista(dadosMotorista);

        if(!motoristaValidacao.isValid()) {
            throw new ValidationError("Os campos Nome e CPF precisam estar preenchidos.");
        }

        const motoristaDuplicado = await this.motoristaRepository.findByCpf(motoristaValidacao.cpf);

        if(motoristaDuplicado) {
            throw new ConflictError("O motorista já está registrado na base de dados.");
        }

        return await this.motoristaRepository.create({
            nome: motoristaValidacao.nome,
            cpf: motoristaValidacao.cpf,
            placaVeiculo: motoristaValidacao.placaVeiculo,
            status: motoristaValidacao.status,
        });
    }

    async encontrarMotoristas(statusFiltro) {
        const todosOsMotoristas = await this.motoristaRepository.findAll();

        if(statusFiltro) {
            return todosOsMotoristas.filter(m => m.status === statusFiltro);
        }

        return todosOsMotoristas;
    }

    async encontrarMotorista(id) {
        return await this.motoristaRepository.findById(id);
    }

    async encontrarEntregasDoMotorista(motoristaId) {
        const motoristaExistente = await this.motoristaRepository.findById(motoristaId);

        if(!motoristaExistente) {
            throw new NotFoundError("O Motorista não foi encontrado.");
        }

        return await this.encomendaRepository.findByMotoristaId(motoristaId);
    }
}