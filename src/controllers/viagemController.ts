import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository';
import SemAssentoVazio from '../../types/errors/SemAssentoVazio';
import ViagemNaoExiste from '../../types/errors/ViagemNaoExiste';
import RequestWithUserData from '../../types/RequestWithUserData';
import TokenPayload from '../../types/TokenPayload';
import ViagemRepository from '../repositories/viagemRepository';
import ViagemService from '../services/viagemService';

const viagemRepo = new ViagemRepository();
const usuarioRepo = new UsuarioRepository();
const viagemService = new ViagemService(viagemRepo, usuarioRepo);

export const adicionarViagem = (request: Request, response: Response) => {
    const dadosViacao = request.body;
    const viagemCriada = viagemService.criarViagem(dadosViacao);
    response.status(201).send(viagemCriada);
}

export const buscarViagem = (request: Request, response: Response) => {
    let dataInicioParse: Date;
    let dataFimParse: Date;
    const { origem, destino, dataInicio, dataFim } = request.query;
    if (dataInicio) {
        dataInicioParse = new Date(dataInicio.toString());
    }
    if (dataFim) {
        dataFimParse = new Date(dataFim.toString())
    }
    const viagens = viagemService.buscarViagens(origem.toString(), destino.toString(), dataInicioParse, dataFimParse);
    response.status(200).send(viagens);
}

export const reservarAssento = (request: RequestWithUserData, response: Response) => {
    try {
        const { id } = request.params;
        const authorization = request.headers.authorization;
        const usuario = verify(authorization, process.env.AUTH_SECRET) as TokenPayload;

        viagemService.reservarAssento(Number(id), usuario.email);
        response.status(200).send("Assento reservado");
    } catch (error) {
        if (error instanceof SemAssentoVazio) {
            response.status(422).send("A viagem selecionada não tem assento vago");
            return;
        }
        if (error instanceof ViagemNaoExiste) {
            response.status(404).send("A viagem selecionada não existe");
            return;
        }
        else throw error;
    }
}