import { Request, Response } from 'express';
import ViacaoRepository from '../repositories/viacaoRepository';
import ViacaoService from '../services/viacaoService';

const viacaoRepo = new ViacaoRepository();
const viacaoService = new ViacaoService(viacaoRepo);

export const adicionarViacao = (request: Request, response: Response) => {
    const dadosViacao = request.body;
    const viacaoCriada = viacaoService.criarViacao(dadosViacao);
    response.status(201).send(viacaoCriada);
}

export const buscarViacao = (request: Request, response: Response) => {
    const { id } = request.params;
    const viacao = viacaoService.buscarViacao(Number(id));
    response.status(200).send(viacao);
}