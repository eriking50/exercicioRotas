import { ultimoIdByArray } from "helpers/UltimoId";
import { AtualizarUsuarioDTO } from "../../types/AtualizarUsuarioDTO";
import { ViagemBD } from "../../types/BD/ViagemDB";
import { ViagemDTO } from "../../types/ViagemDTO";

const viagens: ViagemBD[] = [
    { id: 1, lugaresReservados: 0, totalVagas: 10, data: new Date() , origem: "Belo Horizonte", destino: "São Paulo", viacao: 1},
];

export default class ViagemRepository {
    buscarUsuarioById(id: number) {
        return viagens.find(u => u.id === id);
    }

    adicionarViagem(dadosViagem: ViagemDTO) {
        const id = ultimoIdByArray(viagens);
        const viagem = {...dadosViagem, id, lugaresReservados: 0}
        viagens.push(viagem);
    }

}