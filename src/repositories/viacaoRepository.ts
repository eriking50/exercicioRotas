import { ViacaoBD } from "../../types/BD/ViacaoBD";
import { ViacaoDTO } from "../../types/ViacaoDTO";

const viacoes: ViacaoBD[] = [
    { id: 0, nome: 'ViacaoAcademy', quantidadeOnibus: 10 },
    { id: 1, nome: 'ViacaoAzul', quantidadeOnibus: 10 },
    { id: 2, nome: 'ViacaoSemtigo', quantidadeOnibus: 10 }
];

export default class ViacaoRepository {
    buscarViacaoById(id: number) {
        return viacoes.find(v => v.id === id);
    }

    adicionarViacao(dadosViacao: ViacaoDTO): ViacaoBD {
        const id = viacoes.length;
        const viacao = { id, ...dadosViacao}
        viacoes.push(viacao);
        return viacao
    }
}