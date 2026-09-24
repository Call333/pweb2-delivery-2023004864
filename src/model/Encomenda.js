export class Encomenda{
    constructor({id, descricao, origem, destino, status, motoristaId, historico}) {
        this.id = id ? Number(id) : null;

        this.descricao = descricao;
        this.origem = origem;
        this.destino = destino;
        this.status = status || "CRIADA";
        this.motoristaId = motoristaId;

        this.historico = Array.isArray(historico) ? historico : [
            { data: new Date().toISOString(), status: this.status, descricao: "Encomeda registrada no sistema." }
        ]
    }

    isValid() {
        return !!(this.descricao && this.origem && this.destino);
    }

    avancar() {
        if(this.status === "CRIADA"){
            this.status = "EM_TRANSITO";
            this.adicionarHistorico("A encomenda saiu para entrega.");
        } else if(this.status === "EM_TRANSITO") {
            this.status = "ENTREGUE";
            this.adicionarHistorico("A encomenda foi entregue com sucesso.");
        }  else if (this.status === 'ENTREGUE') {
            throw new Error("Não é possível avançar uma encomenda que já foi ENTREGUE.");
        } else {
            throw new Error(`Transição de status inválida a partir de: ${this.status}`);
        }
    }

    adicionarHistorico(mensagem) {
        this.historico.push({
            data: new Date().toISOString(),
            status: this.status,
            descricao: mensagem || `Status alterado para ${this.status}`
        });
    }
}