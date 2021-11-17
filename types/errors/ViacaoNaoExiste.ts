export default class ViacaoNaoExiste extends Error {
    public name: string;
    constructor() {
      super('a viacao selecionada não existe');
      this.name = 'ViacaoNaoExiste';
    }
  }