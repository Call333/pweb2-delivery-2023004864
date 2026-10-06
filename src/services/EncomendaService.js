import { Encomenda } from "../model/Encomenda.js";
import { ValidationError } from "../utils/errors/ValidationError.js";
import { ConflictError } from "../utils/errors/ConflictError.js";
import { NotFoundError } from "../utils/errors/NotFoundError.js";
import { UnprocessableEntityError } from "../utils/errors/UnprocessableEntityError.js";
import { Motorista } from "../model/Motorista.js";

export class EncomendaService {
    constructor(encomendaRepository, motoristaRepository){
        this.encomendaRepository = encomendaRepository;
        this.motoristaRepository = motoristaRepository;
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

    async encontrarEncomendas(statusFiltro){

        const todasAsEncomendas = await this.encomendaRepository.findAll();

        if(statusFiltro) {
            return todasAsEncomendas.filter(e => e.status === statusFiltro);
        }

        return todasAsEncomendas;
    }

    async encontrarUmaEncomenda(idEncomenda) {
        const encomendaExistente = await this.encomendaRepository.findById(idEncomenda);

        if(!encomendaExistente) {
            throw new NotFoundError("A Encomenda não foi encontrada.");
        }

        return encomendaExistente;
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

    async cancelarStatus(id) {
        const dadosBrutos = await this.encomendaRepository.findById(id);
        if(!dadosBrutos) {
            throw new NotFoundError("Encomenda não encontrada.");
        }

        const encomenda = new Encomenda(dadosBrutos);

        try {
            encomenda.cancelar();
        } catch (error) {
            throw new UnprocessableEntityError(error.message);
        }
        
        return await this.encomendaRepository.update(encomenda);
    }

    async obterHistorico(id) {

        const dadosBrutos = await this.encomendaRepository.findById(id);

        if(!dadosBrutos) {
            throw new NotFoundError("Encomenda não encontrada.");
        }

        return dadosBrutos.historico;
    }

    async atribuirMotorista(idEncomenda, idMotorista) {
        const encomendaValida = await this.encomendaRepository.findById(idEncomenda);

        const motoristaValido = await this.motoristaRepository.findById(idMotorista);

        if(!encomendaValida) {
            throw new NotFoundError("A encomenda não foi encontrada.");
        }

        if(encomendaValida.status === "EM_TRANSITO") {
            throw new UnprocessableEntityError("Não é possivel atribuir um motorista a uma encomenda EM TRANSITO.")
        }

        if(!motoristaValido) {
            throw new NotFoundError("O motorista não foi encontrado.");
        }

        if(motoristaValido.status !== "ATIVO") {
            throw new ValidationError("Não é possivel atribuir uma entrega a um motorista INATIVO.");
        }

        const encomenda = new Encomenda(encomendaValida);

        encomenda.atribuirMotorista(idMotorista);

        return await this.encomendaRepository.update(encomenda);
    }
}