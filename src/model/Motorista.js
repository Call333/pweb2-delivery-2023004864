export class Motorista {
    constructor({id, nome, cpf, placaVeiculo, status, encomendas}) {
        this.id = id ? Number(id) : null;

        this.nome = nome;
        this.cpf = cpf;
        this.placaVeiculo = placaVeiculo;
        this.status = status || "ATIVO";

        this.encomendas = Array.isArray(encomendas) ? encomendas : [];
    }

    isValid() {
        return !!(this.nome && this.cpf)
    }
}