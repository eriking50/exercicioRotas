import ViacaoRepository from "repositories/viacaoRepository";
import { ViacaoBD } from "../../types/BD/ViacaoBD";
import ViacaoNaoExiste from "../../types/errors/ViacaoNaoExiste";
import { ViacaoDTO } from "../../types/ViacaoDTO";

export default class ViacaoService {
    constructor(
        private viacaoRepo: ViacaoRepository
    ) {}

    criarViacao(dadosViacao: ViacaoDTO): ViacaoDTO {
        const viacaoCadastrada = this.viacaoRepo.adicionarViacao(dadosViacao);
        return this.gerarViacaoReposta(viacaoCadastrada);
    }

    buscarViacao(viacaoId: number): ViacaoDTO {
        const viacao = this.viacaoRepo.buscarViacaoById(viacaoId);
        if (!viacao) {
            throw new ViacaoNaoExiste();
            
        }
        return this.gerarViacaoReposta(viacao);
    }

    private gerarViacaoReposta(viacao: ViacaoBD): ViacaoDTO {
        return {
            nome: viacao.nome,
            quantidadeOnibus: viacao.quantidadeOnibus
        }
    }
}