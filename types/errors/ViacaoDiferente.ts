export default class ViacaoDiferente extends Error {
    public name: string;
    constructor() {
      super('o usuário não pode alterar dados de outra viação');
      this.name = 'ViacaoDiferente';
    }
  }