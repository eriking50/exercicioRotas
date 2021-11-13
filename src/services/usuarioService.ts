import { hashSenha } from "helpers/HashSenha";
import { UsuarioBD } from "../../types/BD/UsuarioBD";
import { CadastrarUsuarioDTO } from "../../types/CadastrarUsuarioDTO";
import UsuarioNaoExiste from "../../types/errors/UsuarioNaoExiste";
import { Role } from "../../types/Roles";
import { UsuarioDTO } from "../../types/UsuarioDTO";
import { UsuarioRetornoDTO } from "../../types/UsuarioRetornoDTO";
import UsuarioRepository from "../repositories/usuarioRepository";

export default class UsuarioService {
  constructor(
    private usuarioRepo: UsuarioRepository
  ) {}

  buscarUsuarioById(id: number): UsuarioRetornoDTO {
    const usuario = this.usuarioRepo.buscarUsuarioById(id);
    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    return this.gerarUsuarioRetorno(usuario);
  }

  cadastrarPassageiro(dadosPassageiro: CadastrarUsuarioDTO): UsuarioRetornoDTO {
    const usuario: UsuarioDTO = {
      email: dadosPassageiro.email,
      hashSenha: hashSenha(dadosPassageiro.senha),
      nome: dadosPassageiro.nome,
      viacao: dadosPassageiro.viacao,
      role: Role.passageiro
    };
    const usuarioCriado = this.usuarioRepo.adicionarUsuario(usuario);

    return this.gerarUsuarioRetorno(usuarioCriado);
  }

  cadastrarFuncionario(dadosFuncionario: CadastrarUsuarioDTO, usuarioId: number): UsuarioRetornoDTO {
    const usuarioJaCadastrado = this.usuarioRepo.buscarUsuarioById(usuarioId);
    if (!this.comparaViacao(dadosFuncionario, usuarioJaCadastrado) && !this.isAdmin(usuarioJaCadastrado)) {
      //<TODO> Implementar essa rota sem gerar um erro pra controller retornar um codigo
      return;
    }

    const funcionario: UsuarioDTO = {
      email: dadosFuncionario.email,
      hashSenha: hashSenha(dadosFuncionario.senha),
      nome: dadosFuncionario.nome,
      viacao: dadosFuncionario.viacao,
      role: Role.funcionarioViacao
    };
    const funcionarioCriado = this.usuarioRepo.adicionarUsuario(funcionario);

    return this.gerarUsuarioRetorno(funcionarioCriado);
  }

  cadastrarAdministrador(dadosAdmnistrador: CadastrarUsuarioDTO, usuarioId: number): UsuarioRetornoDTO {
    const usuarioJaCadastrado = this.usuarioRepo.buscarUsuarioById(usuarioId);
    if (!this.isAdmin(usuarioJaCadastrado)) {
      //<TODO> Implementar essa rota sem gerar um erro pra controller retornar um codigo
      return;
    }
    
    const admnistrador: UsuarioDTO = {
      email: dadosAdmnistrador.email,
      hashSenha: hashSenha(dadosAdmnistrador.senha),
      nome: dadosAdmnistrador.nome,
      role: Role.funcionarioViacao
    };
    const admnistradorCriado = this.usuarioRepo.adicionarUsuario(admnistrador);

    return this.gerarUsuarioRetorno(admnistradorCriado);

  }

  //<TODO> Montar Delete para Usuario

  private gerarUsuarioRetorno(usuario: UsuarioBD): UsuarioRetornoDTO {
    return {
      email: usuario.email,
      nome: usuario.nome,
      role: usuario.role,
      viacao: usuario.viacao
    }
  }

  private comparaViacao(dadosUsuario: CadastrarUsuarioDTO, usuario: UsuarioBD): boolean {
    return usuario.viacao === dadosUsuario.viacao
  }

  private isAdmin(usuario: UsuarioBD): boolean {
    return usuario.role === Role.admnistrador
  }
}