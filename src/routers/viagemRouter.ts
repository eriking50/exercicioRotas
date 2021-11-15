import { Router } from 'express';
import { middlewareAutenticador } from "../middlewares/authentication";
import * as viagemController from '../controllers/viagemController';
const router = Router();

router.post("/", middlewareAutenticador, viagemController.adicionarViagem);
router.get("/", middlewareAutenticador, viagemController.buscarViagem);
router.post("/:id", middlewareAutenticador, viagemController.reservarAssento);

export default router;