export class Encomenda{
    constructor({id, descricao, origem, destino, status, historico}) {
        this.id = id ? Numeber(id) : null;
        this.descricao = descricao;
        this.origem = origem;
        this.destino = destino;
        this.status = status || "CRIADA";
        
        this.historico = Array.isArray(historico) ? historico : [
            { data: new Date().toISOString(), status: this.status, descricao: "Encomeda registrada no sistema." }
        ]
    }

    isValid() {
        return !!(this.descricao && this.origem && this.destino);
    }
}