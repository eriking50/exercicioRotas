import { config } from 'dotenv';
import * as cors from 'cors';
config();

import * as express from "express";
import * as morgan from 'morgan';
import usuarioRouter from './src/routers/usuarioRouter';
import viacaoRouter from './src/routers/viacaoRouter';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({}));


app.use('/usuarios', usuarioRouter);
app.use('/viacoes', viacaoRouter);

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
