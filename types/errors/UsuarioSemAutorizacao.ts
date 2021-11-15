export default class UsuarioSemAutorizacao extends Error {
    public name: string;
    constructor() {
      super('esse usuario não possui autorização para tal ação');
      this.name = 'UsuarioSemAutorizacao';
    }
  }