import { Router } from 'express';
import { middlewareAutenticador, middlewareAutorizadorAdmin } from '../middlewares/authentication';
import * as viacaoController from '../controllers/viacaoController';
const router = Router();

router.post("/", middlewareAutenticador, middlewareAutorizadorAdmin, viacaoController.adicionarViacao);
router.get("/:id", middlewareAutenticador, middlewareAutorizadorAdmin, viacaoController.buscarViacao);

export default router;