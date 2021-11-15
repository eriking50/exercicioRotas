import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import TokenPayload from '../../types/TokenPayload';
import RequestWithUserData from '../../types/RequestWithUserData';
import UsuarioService from '../services/usuarioService';
import EmailJaCadastrado from '../../types/errors/EmailJaCadastrado';
import UsuarioNaoExiste from '../../types/errors/UsuarioNaoExiste';
import UsuarioSemAutorizacao from '../../types/errors/UsuarioSemAutorizacao';
import UsuarioRepository from '../repositories/usuarioRepository';

const usuarioRepo = new UsuarioRepository()
const usuarioService = new UsuarioService(usuarioRepo);

  export const fazerLogin = (request: Request, response: Response) => {
    const { email: emailLogin, senha: senhaLogin } = request.body;
    if (usuarioService.compararSenha(senhaLogin, emailLogin)) {
      const { email, nome, role, viacao } = usuarioService.buscarUsuarioByEmail(emailLogin); 
      const payload: TokenPayload = {
        role,
        nome,
        viacao,
        email
      };
      const token = sign(payload, process.env.AUTH_SECRET);
      response.status(200).send(token);
      return;
    }
    response.status(422).send("usuario ou senha não encontrados");
  } 

  export const cadastrarPassageiro = (request: Request, response: Response) => {
    try {
      const passageiro = request.body;
      const novoPassageiro = usuarioService.cadastrarPassageiro(passageiro);
  
      response.status(201).send(novoPassageiro);
    } catch (error) {
      if (error instanceof EmailJaCadastrado) {
        response.status(422).send("O email já se encontra no sistema");
      }
    }
  }

  export const cadastrarFuncionario = (request: RequestWithUserData, response: Response) => {
    try {
      const authorization = request.headers.authorization;
      const usuario = verify(authorization, process.env.AUTH_SECRET) as TokenPayload;

      const funcionario = request.body;
      const novoFuncionario = usuarioService.cadastrarFuncionario(funcionario, usuario.email);

      response.status(201).send(novoFuncionario);
    } catch (error) {
      if (error instanceof EmailJaCadastrado) {
        response.status(422).send("O email já se encontra no sistema");
      }
    }
  }

  export const cadastrarAdmnistrador = (request: RequestWithUserData, response: Response) => {
    try {
      const admnistrador = request.body;
      const novoAdmnistrador = usuarioService.cadastrarAdministrador(admnistrador);
  
      response.status(201).send(novoAdmnistrador);
    } catch (error) {
      if (error instanceof EmailJaCadastrado) {
        response.status(422).send("O email já se encontra no sistema");
      }
    }
  }

  export const buscarMeusDados = (request: RequestWithUserData, response: Response) => {
    try {
      const { usuario: tokenPayload } = request;
      const { email } = tokenPayload;
      const usuario = usuarioService.buscarUsuarioByEmail(email)
      response.status(200).send(usuario);
    } catch (error) {
      if (error instanceof UsuarioNaoExiste) {
        response.status(422).send("usuario ou senha não encontrados");
      }
    }
  }