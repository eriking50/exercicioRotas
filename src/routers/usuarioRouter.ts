import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { authenticationMiddleware, authorizationMiddleware } from '../middlewares/authentication';
const router = Router();

// rota aberta para todos.
router.post('/usuarios/signin', usuarioController.autenticar);

router.get('/usuarios/me', authenticationMiddleware, usuarioController.buscarMeusDados);

router.get('/usuarios', authenticationMiddleware, authorizationMiddleware, usuarioController.listar);
router.get('/usuarios/:id', authenticationMiddleware, authorizationMiddleware, usuarioController.buscar);
router.post('/usuarios', authenticationMiddleware, authorizationMiddleware, usuarioController.criar);
router.patch('/usuarios/:id', authenticationMiddleware, authorizationMiddleware, usuarioController.atualizar);
router.delete('/usuarios/:id', authenticationMiddleware, authorizationMiddleware, usuarioController.deletar);

export default router;