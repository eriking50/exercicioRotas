import { ViagemBD } from "../../types/BD/ViagemDB";
import { ViagemDTO } from "../../types/ViagemDTO";

const viagens: ViagemBD[] = [
    { id: 0, lugaresReservados: [], totalVagas: 10, data: new Date() , origem: "Belo Horizonte", destino: "São Paulo", viacao: 1, ativo: true},
];

export default class ViagemRepository {
    buscarUsuarioById(id: number): ViagemBD {
        return viagens.find(u => u.id === id);
    }

    adicionarViagem(dadosViagem: ViagemDTO): ViagemBD {
        const id = viagens.length
        const viagem = {...dadosViagem, id, lugaresReservados: [], ativo: true};
        viagens.push(viagem);
        return viagem;
    }

    atualizarViagem(viagemId: number, viagem: ViagemBD) {
        const viagemIndex = viagens.findIndex(viagemMap => viagemId === viagemMap.id);
        viagens.splice(viagemIndex, 1, viagem);
    }

    deletarViagem(viagemId: number) {
        const viagemIndex = viagens.findIndex(viagemMap => viagemId === viagemMap.id);
        viagens.splice(viagemIndex, 1);
    }

    buscarViagens(origem: string, destino: string, dataInicio?: Date, dataFim?: Date): ViagemBD[] {
        return viagens.map(viagem => {
            if (
                this.confereData(viagem, dataInicio, dataFim) &&
                this.confereOrigemEDestino(viagem, origem, destino)
            ) {
                return viagem;
            }
        })
    }

    buscarViagemById(id: number): ViagemBD {
        return viagens.find(viagem => {
            if (viagem.id === id) {
                return
            }
        })
    }

    private confereData(viagem: ViagemBD, dataInicio?: Date, dataFim?: Date): boolean {
        return dataInicio && viagem.data.getTime() > dataInicio.getTime() && dataFim && viagem.data.getTime() > dataFim.getTime();
    }

    private confereOrigemEDestino(viagem: ViagemBD, origem: string, destino: string): boolean {
        return viagem.origem === origem && viagem.destino === destino;
    }

}