import UsuarioNaoExiste from "../../types/errors/UsuarioNaoExiste";
import UsuarioRepository from "../repositories/usuarioRepository";

export default class UsuarioService {
  constructor(
    private usuarioRepo: UsuarioRepository
  ) {}

  buscarMeusDadosPorId(id: number) {
    const usuario = this.usuarioRepo.buscarUsuarioById(id);
    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    return usuario;
  }
}