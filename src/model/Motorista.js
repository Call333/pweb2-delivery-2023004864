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

    inativarMotorista() {
        if(this.status === "ATIVO") {
            this.status = "INATIVO";
        } else {
            throw new Error("Não é possível inativar um motorista já INATIVO.");
        }
        
    }

    ativarMotorista() {
        if(this.status === "INATIVO") {
            this.status = "ATIVO";
        } else {
            throw new Error("Não é possível ativar um motorista já ATIVO.");
        };
    }
}