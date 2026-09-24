import { Encomenda } from "../model/Encomenda.js";
import { ValidationError } from "../utils/errors/ValidationError.js";
import { ConflictError } from "../utils/errors/ConflictError.js";
import { NotFoundError } from "../utils/errors/NotFoundError.js";
import { UnprocessableEntityError } from "../utils/errors/UnprocessableEntityError.js";

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

        return await this.encomendaRepository.create({
            descricao: encomendaValidacao.descricao,
            origem: encomendaValidacao.origem,
            destino: encomendaValidacao.destino,
            status: encomendaValidacao.status,
            motoristaId: encomendaValidacao.motoristaId,
            historico: encomendaValidacao.historico
        });
    }

    async encontrarEncomendas(){
        return await this.encomendaRepository.findAll();
    }

    async avancarStatus(id) {
        
        const dadosBrutos = await this.encomendaRepository.findById(id);
        if(!dadosBrutos) {
            throw new NotFoundError("Encomenda não encontrada.");
        }

        const encomenda = new Encomenda(dadosBrutos);
        try {
            encomenda.avancar();
        } catch (error) {
            throw new UnprocessableEntityError(error.message);
        }
        
        return await this.encomendaRepository.update(encomenda);
    }
}