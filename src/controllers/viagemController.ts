import { Request, Response } from 'express';
import UsuarioRepository from '../repositories/usuarioRepository';
import SemAssentoVazio from '../../types/errors/SemAssentoVazio';
import ViagemNaoExiste from '../../types/errors/ViagemNaoExiste';
import RequestWithUserData from '../../types/RequestWithUserData';
import ViagemRepository from '../repositories/viagemRepository';
import ViagemService from '../services/viagemService';
import ViagemInativa from '../../types/errors/ViagemInativa';
import ViacaoDiferente from '../../types/errors/ViacaoDiferente';

const viagemRepo = new ViagemRepository();
const usuarioRepo = new UsuarioRepository();
const viagemService = new ViagemService(viagemRepo, usuarioRepo);

export const adicionarViagem = (request: RequestWithUserData, response: Response) => {
    const dadosViagem = request.body;
    const usuario = request.usuario
    const viagemCriada = viagemService.criarViagem(dadosViagem, usuario.viacao);
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

        viagemService.reservarAssento(Number(id), request.usuario.email);
        response.status(200).send("Assento reservado");
    } catch (error) {
        if (error instanceof SemAssentoVazio) {
            response.status(422).send("Não foi possível fazer a reserva, a viagem selecionada não tem assento vago");
            return;
        }
        if (error instanceof ViagemNaoExiste) {
            response.status(404).send("Não foi possível fazer a reserva, a viagem selecionada não existe");
            return;
        }
        if (error instanceof ViagemInativa) {
            response.status(404).send("Não foi possível fazer a reserva, a viagem selecionada não está ativa");
            return;
        }
        else throw error;
    }
}

export const inativarViagem = (request: RequestWithUserData, response: Response) => {
    try {
        const { id } = request.params;

        viagemService.inativarViagem(Number(id), request.usuario.viacao);
        response.status(200).send("Viagem inativada com sucesso");
    } catch (error) {
        if (error instanceof ViacaoDiferente) {
            response.status(422).send("O usuário não pode alterar dados de outra viação.");
            return;
        }
        else throw error;
    }
}