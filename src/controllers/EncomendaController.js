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
}