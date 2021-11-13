import ViagemRepository from "repositories/viagemRepository";
import { ViagemBD } from "../../types/BD/ViagemDB";
import { ViagemRetornoDTO } from "../../types/ViagemRetornoDTO";

export default class UsuarioService {
    constructor(
        private viagemRepo: ViagemRepository
    ) {}

    buscarViagens(origem: string, destino: string, dataInicio?: Date, dataFim?: Date): ViagemRetornoDTO[] {
        if (!dataInicio) {
            dataInicio = new Date();
            dataFim = new Date();
            dataFim.setDate(dataInicio.getDate() + 7);
        }
        const viagens = this.viagemRepo.buscarViagens(origem, destino, dataInicio, dataFim);
        
        return viagens.map(viagem => {
            return this.gerarRetornoViagem(viagem);
        })
    }

    //<TODO> Talvez não retorne nada
    reservarAssento(viagemId: number, usuarioId: number): ViagemRetornoDTO {
        const viagem = this.viagemRepo.buscarViagemById(viagemId);
        if (!viagem) {
            //<TODO> Implementar essa rota sem gerar um erro pra controller retornar um codigo
            return;
        }
        if (this.haveAssentoVazio(viagem)) {
            viagem.lugaresReservados.push(usuarioId);
        } else {
            this.desativarViagem(viagem);
            //<TODO> Implementar essa rota sem gerar um erro pra controller retornar um codigo
            return;
        }

        this.viagemRepo.atualizarViagem(viagemId, viagem);
        return this.gerarRetornoViagem(viagem);
    }

    cancelarViagem(viagemId: number) {
        this.viagemRepo.deletarViagem(viagemId);
    }

    private gerarRetornoViagem(viagem: ViagemBD): ViagemRetornoDTO {
        return {
            data: viagem.data,
            destino: viagem.destino,
            origem: viagem.destino,
            quantidadeVagasLivres: viagem.totalVagas - viagem.lugaresReservados.length,
            viacao: viagem.viacao,
        }
    }

    private haveAssentoVazio(viagem: ViagemBD): boolean {
        return viagem.lugaresReservados.length < viagem.totalVagas
    }

    private desativarViagem(viagem: ViagemBD) {
        viagem.ativo = false;
        this.viagemRepo.atualizarViagem(viagem.id, viagem);
    }

}