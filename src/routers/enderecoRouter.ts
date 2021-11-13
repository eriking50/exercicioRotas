import { Router } from 'express';
const router = Router();

router.get('/enderecos/:cep', (req: any, res: any) => {
  res.send({
    cep: '32235230',
    logradouro: 'rua franca campos'
  })
});

export default router;