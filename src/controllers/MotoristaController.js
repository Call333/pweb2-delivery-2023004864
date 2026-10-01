export class MotoristaController {
    constructor(motoristaService) {
        this.motoristaService = motoristaService;
    }

    criar = async (req, res) => {
        try {
            const {nome, cpf} = req.body;

            const novoMotorista = await this.motoristaService.criarMotorista({
                nome, cpf
            });

            return res.status(201).json(novoMotorista);

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