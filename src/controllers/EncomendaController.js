export class EncomendaController {
    constructor(encomendaService) {
        this.encomendaService = encomendaService;
    }

    criar = async (req, res) =>{
        try {
            const {descricao, origem, destino } = req.body;

            const novaEncomenda = await this.encomendaService.criarEncomenda({
                descricao, origem, destino
            });

            return res.status(201).json(novaEncomenda);

        } catch(error) {    
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }   
    }

    encontrarTodos = async (req, res) => {
        try {
            const { status } = req.query;

            const encomendas = await this.encomendaService.encontrarEncomendas(status);

            return res.status(200).json(encomendas);
        } catch (error){
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }

    encontrarUmaEncomenda = async (req, res) => {
        try {
            const { id } = req.params;

            const encomendas = await this.encomendaService.encontrarUmaEncomenda(id);

            return res.status(200).json(encomendas);
        } catch (error){
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }

    avancar = async (req, res) => {
        try {
            const { id } = req.params;
            const encomendaAtualizada = await this.encomendaService.avancarStatus(id);

            return res.status(200).json(encomendaAtualizada);
            
        } catch (error){
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }

    cancelar = async (req, res) => {
        try {
            const { id } = req.params;
            const encomendaAtualizada = await this.encomendaService.cancelarStatus(id);

            return res.status(200).json(encomendaAtualizada);
            
        } catch (error){
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }

    buscarHistorico = async (req, res) => {
        try {
            const { id } = req.params;
            const historico = await this.encomendaService.obterHistorico(id);

            return res.status(200).json(historico);
            
        } catch (error){
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }

    atribuirMotorista = async (req, res) => {
        try {
            const { id } = req.params;
            const { motoristaId } = req.body;

            const atribuir = await this.encomendaService.atribuirMotorista(id, motoristaId);

            return res.status(200).json(atribuir);
        } catch (error) {
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }
}