export class Motorista {
    constructor({id, nome, cpf, placaVeiculo, status, entregas}) {
        this.id = id ? Number(id) : null;

        this.nome = nome;
        this.cpf = cpf;
        this.placaVeiculo = placaVeiculo;
        this.status = status || "ATIVO";

        this.encomendas = Array.isArray(entregas) ? entregas : [];
    }

    isValid() {
        return !!(this.nome && this.cpf)
    }
}