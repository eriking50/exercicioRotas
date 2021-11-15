import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { middlewareAutenticador, middlewareAutorizadorFuncionario, middlewareAutorizadorAdmin } from '../middlewares/authentication';
const router = Router();

router.post('/usuarios/login', usuarioController.fazerLogin);
router.post('/usuarios/cadastrar', usuarioController.cadastrarPassageiro)

router.get('/usuarios/me', middlewareAutenticador, usuarioController.buscarMeusDados);

router.post('/usuarios/cadastrarFuncionario', middlewareAutenticador, middlewareAutorizadorFuncionario, usuarioController.cadastrarFuncionario);
router.post('/usuarios/cadastrarAdmin', middlewareAutenticador, middlewareAutorizadorAdmin, usuarioController.cadastrarAdmnistrador);

export default router;