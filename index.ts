import { config } from 'dotenv';
import * as cors from 'cors';
config();

import * as express from "express";
import * as morgan from 'morgan';
import usuarioRouter from './src/routers/usuarioRouter';
import enderecoRouter from './src/routers/enderecoRouter';
// import authenticationMiddleware from './middlewares/authentication';

const app = express();
app.use(cors());
app.use(morgan('dev'));
// app.use(authenticationMiddleware('paulo@123'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({}));


app.use('/v1', usuarioRouter);
app.use('/v1', enderecoRouter);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).send('rota nao encontrada');
});

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errorMessage = error.message;

  console.log(errorMessage);
  const response = process.env.NODE_ENV === 'development' ?
    errorMessage :
    'erro inesperado. Consulte o admin.'
  ;

  res.status(500).send({response});
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`aplicação rodando na porta ${port}`);
});
