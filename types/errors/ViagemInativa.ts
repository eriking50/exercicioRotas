export default class ViagemInativa extends Error {
    public name: string;
    constructor() {
      super('a viagem selecionada está inativa no sistema');
      this.name = 'ViagemInativa';
    }
  }