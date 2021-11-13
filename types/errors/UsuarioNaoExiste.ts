export default class UsuarioNaoExiste extends Error {
  public name: string;
  constructor() {
    super('usuario não encontrado');
    this.name = 'UsuarioNaoExiste';
  }
}