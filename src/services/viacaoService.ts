import ViacaoRepository from "repositories/viacaoRepository";
import { ViacaoBD } from "../../types/BD/ViacaoBD";
import { ViacaoDTO } from "../../types/ViacaoDTO";

export default class ViacaoService {
    constructor(
        private viacaoRepo: ViacaoRepository
    ) {}

    criarViacao(dadosViacao: ViacaoDTO): ViacaoDTO {
        const viacaoCadastrada = this.viacaoRepo.adicionarViacao(dadosViacao);
        return this.gerarViacaoReposta(viacaoCadastrada);
    }

    buscarViacao(viacaoId: number) {
        const viacao = this.viacaoRepo.buscarViacaoById(viacaoId);
        return this.gerarViacaoReposta(viacao);
    }

    private gerarViacaoReposta(viacao: ViacaoBD): ViacaoDTO {
        return {
            nome: viacao.nome,
            quantidadeOnibus: viacao.quantidadeOnibus
        }
    }
}