export default class EmailJaCadastrado extends Error {
    public name: string;
    constructor() {
      super('o email já se encontra no sistema');
      this.name = 'EmailJaCadastrado';
    }
  }