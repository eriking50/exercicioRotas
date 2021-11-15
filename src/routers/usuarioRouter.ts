import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { middlewareAutenticador, middlewareAutorizadorFuncionario, middlewareAutorizadorAdmin } from '../middlewares/authentication';
const router = Router();

router.post('/login', usuarioController.fazerLogin);
router.post('/cadastrar', usuarioController.cadastrarPassageiro)

router.get('/me', middlewareAutenticador, usuarioController.buscarMeusDados);

router.post('/cadastrarFuncionario', middlewareAutenticador, middlewareAutorizadorFuncionario, usuarioController.cadastrarFuncionario);
router.post('/cadastrarAdmin', middlewareAutenticador, middlewareAutorizadorAdmin, usuarioController.cadastrarAdmnistrador);

export default router;