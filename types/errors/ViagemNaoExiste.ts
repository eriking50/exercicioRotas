export default class ViagemNaoExiste extends Error {
    public name: string;
    constructor() {
      super('a viagem procurada não existe');
      this.name = 'ViagemNãoExiste';
    }
  }