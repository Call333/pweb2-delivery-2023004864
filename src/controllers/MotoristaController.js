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

    encontrarTodos = async (req, res) => {
        try {

            const { status } = req.query;

            const motoristas = await this.motoristaService.encontrarMotoristas(status);

            return res.status(200).json(motoristas);

        } catch (error) {
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }

    encontrarMotorista = async (req, res) => {
        try {

            const { id } = req.params;

            const motorista = await this.motoristaService.encontrarUmMotorista(id);

            return res.status(200).json(motorista);

        } catch (error) {
            console.error("====== ERRO CAPTURADO NO CONTROLLER ======", error);

            const statusCode = error.statusCode || 500;

            return res.status(statusCode).json({
                status: "error",
                message: error.message
            })
        }
    }

    encontrarEntregas = async (req, res) => {
        try {

            const { id } = req.params;

            const entregas = await this.motoristaService.encontrarEntregasDoMotorista(id);

            return res.status(200).json(entregas);

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