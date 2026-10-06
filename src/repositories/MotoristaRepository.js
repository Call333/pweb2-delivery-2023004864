import { Motorista } from "../model/Motorista.js";

export class MotoristaRepository {
    constructor(database) {
        this.database = database;
    }

    async create(dadosMotorista) {
        const proximoId = this.database.proximo_id_motorista;

        this.database.proximo_id_motorista += 1;

        const novoMotorista = new Motorista({
            id: proximoId,
            nome: dadosMotorista.nome,
            cpf: dadosMotorista.cpf,
            placaVeiculo: dadosMotorista.placaVeiculo,
            status: dadosMotorista.status,
            encomendas: dadosMotorista.encomendas
        });

        console.log("=== REPOSITÓRIO: A tentar inserir este motorista===", novoMotorista);

        this.database.motoristas.push({
            id: proximoId,
            nome: novoMotorista.nome,
            cpf: novoMotorista.cpf,
            placaVeiculo: novoMotorista.placaVeiculo,
            status: novoMotorista.status,
            encomendas: novoMotorista.encomendas
        })

        console.log("=== REPOSITÓRIO: Estado atual do banco mock ===", this.database.motoristas);
        console.log(`=== REPOSITÓRIO: Total de itens guardados: ${this.database.motoristas.length} ===`);

        return novoMotorista;
    }

    async findAll() {
        return this.database.motoristas;
    }

    async findById(id) {
        return this.database.motoristas.find(m => m.id === Number(id) || null);
    }

    async findByCpf(cpf) {
        return this.database.motoristas.find(m => m.cpf === cpf || null);
    }
}