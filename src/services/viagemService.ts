import UsuarioRepository from "../repositories/usuarioRepository";
import ViagemRepository from "../repositories/viagemRepository";
import { ViagemBD } from "../../types/BD/ViagemDB";
import SemAssentoVazio from "../../types/errors/SemAssentoVazio";
import ViagemNaoExiste from "../../types/errors/ViagemNaoExiste";
import { ViagemDTO } from "../../types/ViagemDTO";
import { ViagemRetornoDTO } from "../../types/ViagemRetornoDTO";
import { CriarViagemDTO } from "../../types/CriarViagemDTO";
import ViagemInativa from "../../types/errors/ViagemInativa";
import ViacaoDiferente from "../../types/errors/ViacaoDiferente";

export default class ViagemService {
    constructor(
        private viagemRepo: ViagemRepository,
        private usuarioRepo: UsuarioRepository
    ) {}

    criarViagem(dadosViagem: CriarViagemDTO, usuarioViacao: number): ViagemRetornoDTO {
        const novaViagem: ViagemDTO = {
            totalVagas: dadosViagem.totalVagas,
            data: dadosViagem.data,
            destino: dadosViagem.destino,
            origem: dadosViagem.origem,
            viacao: usuarioViacao,
        }
        const viagem = this.viagemRepo.adicionarViagem(novaViagem);
        return this.gerarRetornoViagem(viagem);
    }

    buscarViagens(origem: string, destino: string, dataInicio?: Date, dataFim?: Date): ViagemRetornoDTO[] {
        if (!dataInicio) {
            dataInicio = new Date();
        }
        if (!dataFim) {
            dataFim = new Date(dataInicio);
            dataFim.setDate(dataInicio.getDate() + 7);
        }
        const viagens = this.viagemRepo.buscarViagens(origem, destino, dataInicio, dataFim);
        if (!viagens[0]) {
            return [];
        }
        return viagens.map(viagem => {
            return this.gerarRetornoViagem(viagem);
        })
    }

    reservarAssento(viagemId: number, email: string) {
        const viagem = this.viagemRepo.buscarViagemById(viagemId);
        if (!viagem) {
            throw new ViagemNaoExiste();
        }
        if (!viagem.ativo) {
            throw new ViagemInativa();
        }
        const usuario = this.usuarioRepo.buscarUsuarioByEmail(email);
        if (this.haveAssentoVazio(viagem)) {
            viagem.lugaresReservados.push(usuario.id);
        } else {
            this.desativarViagem(viagem);
            throw new SemAssentoVazio();
        }

        this.viagemRepo.atualizarViagem(viagemId, viagem);
        return;
    }

    private gerarRetornoViagem(viagem: ViagemBD): ViagemRetornoDTO {
        return {
            data: viagem.data,
            origem: viagem.origem,
            destino: viagem.destino,
            quantidadeVagasLivres: viagem.totalVagas - viagem.lugaresReservados.length,
            viacao: viagem.viacao,
        }
    }

    inativarViagem(viagemId: number, viacaoUsuario: number): void {
        const viagem = this.viagemRepo.buscarViagemById(viagemId);
        if(viagem.viacao === viacaoUsuario) {
            viagem.ativo = false;
            this.viagemRepo.atualizarViagem(viagemId, viagem);
            return;
        }
        throw new ViacaoDiferente();
    }

    private haveAssentoVazio(viagem: ViagemBD): boolean {
        return viagem.lugaresReservados.length < viagem.totalVagas
    }

    private desativarViagem(viagem: ViagemBD) {
        viagem.ativo = false;
        this.viagemRepo.atualizarViagem(viagem.id, viagem);
    }

}