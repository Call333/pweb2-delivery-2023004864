import { Motorista } from "../model/Motorista.js";
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

        return await this.motoristaRepository.create({
            nome: motoristaValidacao.nome,
            cpf: motoristaValidacao.cpf,
            placaVeiculo: motoristaValidacao.placaVeiculo,
            status: motoristaValidacao.status,
            encomendas: motoristaValidacao.encomendas
        });
    }
}