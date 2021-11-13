import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import TokenPayload from '../../types/TokenPayload';
import RequestWithUserData from '../../types/RequestWithUserData';
import UsuarioService from '../services/usuarioService';
import UsuarioNaoExiste from '../../types/errors/UsuarioNaoExiste';
import UsuarioRepository from '../repositories/usuarioRepository';

const usuarioRepo = new UsuarioRepository()
const usuarioService = new UsuarioService(usuarioRepo);

const usuarios = [];
export const autenticar = (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email);
  
  if (usuario?.senha === senha) {
    const { role, nome, id, email } = usuario;
    const payload: TokenPayload = {
      role,
      nome,
      id,
      email
    };
    const token = sign(payload, process.env.AUTH_SECRET);
    res.send({token});
  }

  res.status(422).send("usuario ou senha não encontrados");
};


export const listar = (req: RequestWithUserData, res: Response) => {
  console.log('....', req.usuario);
  const nome = req.query.nome as string;
  if (nome) {
    const filteredUsuarios = usuarios.filter(u => u.nome.match(new RegExp(nome, 'i')));
    return res.send(filteredUsuarios)
  }

  res.send(usuarios);
};

export const buscar = (req: Request, res: Response) => {
  const { id } = req.params;
  buscarUsuarioPorId(req, res, Number(id));
};

export const buscarMeusDados = (req: RequestWithUserData, res: Response) => {
  const { usuario: tokenPayload } = req;
  const id = tokenPayload.id;
  buscarUsuarioPorId(req, res, Number(id));
};

export const criar = (req: Request, res: Response) => {
  const usuario = req.body;
  usuarios.push(usuario);

  res.status(201).send(usuario);
};

export const atualizar = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const usuario = req.body;
  const index = usuarios.findIndex(u => u.id === id);

  if (index < 0) {
    res.status(404).send();
  }

  usuarios[index] = { ...usuario, id };
  res.send(usuarios[index]);
};

export const deletar = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  usuarios.splice(index, 1);
  res.status(204).send('ok');
};

const buscarUsuarioPorId = (req: Request, res: Response, id: number) => {
  try {
    const usuario = usuarioService.buscarMeusDadosPorId(id);
    res.send(usuario);
  } catch (error) {
    if (error instanceof UsuarioNaoExiste) {
      return res.status(404).send();
    }
  }
};