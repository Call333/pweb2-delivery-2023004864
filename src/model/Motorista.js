export class Motorista {
    constructor({id, nome, cpf, placaVeiculo, status}) {
        this.id = id ? Number(id) : null;

        this.nome = nome;
        this.cpf = cpf;
        this.placaVeiculo = placaVeiculo;
        this.status = status || "ATIVO";
    }

    isValid() {
        return !!(this.nome && this.cpf)
    }
}