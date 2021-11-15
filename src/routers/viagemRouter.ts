import { Router } from 'express';
import { middlewareAutenticador } from 'middlewares/authentication';
const router = Router();

router.post("/", middlewareAutenticador, viacaoController.adicionarViacao);
router.get("/:id", middlewareAutenticador, viacaoController.buscarViacao);

export default router;