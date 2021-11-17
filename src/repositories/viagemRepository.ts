import { ViagemBD } from "../../types/BD/ViagemDB";
import { ViagemDTO } from "../../types/ViagemDTO";

const viagens: ViagemBD[] = [
    { id: 0, lugaresReservados: [], totalVagas: 1, data: new Date("10/10/2021") , origem: "Belo Horizonte", destino: "São Paulo", viacao: 1, ativo: true},
    { id: 1, lugaresReservados: [], totalVagas: 1, data: new Date("17/11/2021") , origem: "Belo Horizonte", destino: "São Paulo", viacao: 2, ativo: true},
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

    atualizarViagem(viagemId: number, viagem: ViagemBD): void {
        const viagemIndex = viagens.findIndex(viagemMap => viagemId === viagemMap.id);
        viagens.splice(viagemIndex, 1, viagem);
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
        return viagens.find(viagem => viagem.id === id);
    }

    private confereData(viagem: ViagemBD, dataInicio?: Date, dataFim?: Date): boolean {
        return viagem.data && dataInicio && viagem.data.getTime() > dataInicio.getTime() && dataFim && viagem.data.getTime() < dataFim.getTime();
    }

    private confereOrigemEDestino(viagem: ViagemBD, origem: string, destino: string): boolean {
        return viagem.origem === origem && viagem.destino === destino;
    }

}