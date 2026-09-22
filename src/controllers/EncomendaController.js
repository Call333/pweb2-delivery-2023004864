export class EncomendaController {
    constructor(encomendaService) {
        this.encomendaService = encomendaService;
    }

    async criar(req, res) {
        try {
            const {descricao, origem, destino } = req.body;

            const novaEncomenda = await this.encomendaService.criarEncomenda({
                descricao, origem, destino
            });

            return res.status(201).json(novaEncomenda);

        } catch(error) {
            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }   
    }
}