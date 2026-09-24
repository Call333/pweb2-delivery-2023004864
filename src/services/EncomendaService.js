import { Encomenda } from "../model/Encomenda.js";
import { ValidationError } from "../utils/errors/ValidationError.js";
import { ConflictError } from "../utils/errors/ConflictError.js";

export class EncomendaService {
    constructor(encomendaRepository){
        this.encomendaRepository = encomendaRepository;
    }

    async criarEncomenda(dadosEncomenda){
        const encomendaValidacao = new Encomenda(dadosEncomenda);
        
        if(!encomendaValidacao.isValid()) {
            throw new ValidationError("Os Campos descricao, origem e destino são obrigatórios.")
        } else if(encomendaValidacao.origem === encomendaValidacao.destino) {
            throw new ValidationError("O destino e a origem não podem ser iguais.")
        }

        const encomendaDuplicada = await this.encomendaRepository.findByDescricao(encomendaValidacao.descricao);

        if(encomendaDuplicada) {
            throw new ConflictError("Encomenda duplicada ativa.")
        }

        return await this.encomendaRepository.create(encomendaValidacao);
    }

    async encontrarEncomendas(){
        return await this.encomendaRepository.findAll();
    }
}