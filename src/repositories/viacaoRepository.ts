import { ViacaoBD } from "../../types/BD/ViacaoBD";
import { ViacaoDTO } from "../../types/ViacaoDTO";
import { ultimoIdByArray } from "helpers/UltimoId";

const viacoes: ViacaoBD[] = [
    { id: 1, nome: 'ViacaoAcademy', quantidadeOnibus: 10 },
    { id: 2, nome: 'ViacaoAzul', quantidadeOnibus: 10 },
    { id: 3, nome: 'ViacaoSemtigo', quantidadeOnibus: 10 }
];

export default class ViacaoRepository {
    buscarViacaoById(id: number) {
        return viacoes.find(v => v.id === id);
    }

    adicionarViacao(dadosViacao: ViacaoDTO): ViacaoBD {
        const id = ultimoIdByArray(viacoes);
        const viacao = {...dadosViacao, id}
        viacoes.push(viacao);
        return viacao
    }

    atualizarViacao(viacaoId: number, dadosViacao: ViacaoDTO) {
        const viacaoIndex = viacoes.findIndex(viacoes => viacoes.id = viacaoId);
        const viacao = viacoes.find(viacao => viacao.id === viacaoId);
        viacoes.splice(viacaoIndex, 1, {...dadosViacao, ...viacao});
    }
}