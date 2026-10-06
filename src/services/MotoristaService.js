import { Motorista } from "../model/Motorista.js";
import { ConflictError } from "../utils/errors/ConflictError.js";
import { ValidationError } from "../utils/errors/ValidationError.js";

export class MotoristaService {
    constructor(motoristaRepository) {
        this.motoristaRepository = motoristaRepository;
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
            encomendas: motoristaValidacao.encomendas
        });
    }

    async encontrarMotoristas(statusFiltro) {
        const todosOsMotoristas = await this.motoristaRepository.findAll();

        if(statusFiltro) {
            return todosOsMotoristas.filter(m => m.status === statusFiltro);
        }

        return todosOsMotoristas;
    }


}