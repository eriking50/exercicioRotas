import { Router } from 'express';
import { middlewareAutenticador, middlewareAutorizadorFuncionario } from "../middlewares/authentication";
import * as viagemController from '../controllers/viagemController';
const router = Router();

router.post("/", middlewareAutenticador, viagemController.adicionarViagem);
router.get("/", middlewareAutenticador, viagemController.buscarViagem);
router.post("/:id", middlewareAutenticador, middlewareAutorizadorFuncionario, viagemController.reservarAssento);
router.delete("/inativar/:id", middlewareAutenticador, middlewareAutorizadorFuncionario, viagemController.inativarViagem);

export default router;