import { ValidationError } from "../utils/errors/ValidationError.js";

export class EncomendaService {
    constructor(encomendaRepository){
        this.encomendaRepository = encomendaRepository;
    }

    async criarEncomenda(dadosEncomenda){
        const encomendaValidacao = new Encomenda(dadosEncomenda);

        if(!encomendaValidacao.isValid()) {
            throw new ValidationError("Os Campos descricao, origem e destino são obrigatórios.")
        }

        return await this.encomendaRepository.create(encomendaValidacao);
    }
}