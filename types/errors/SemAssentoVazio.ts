export default class SemAssentoVazio extends Error {
    public name: string;
    constructor() {
      super('a viagem não tem nenhum assento vazio');
      this.name = 'SemAssentoVazio';
    }
  }