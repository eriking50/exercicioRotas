import { toHashSenha } from "../helpers/HashSenha";
import { UsuarioBD } from "../../types/BD/UsuarioBD";
import { CadastrarUsuarioDTO } from "../../types/CadastrarUsuarioDTO";
import EmailJaCadastrado from "../../types/errors/EmailJaCadastrado";
import UsuarioNaoExiste from "../../types/errors/UsuarioNaoExiste";
import UsuarioSemAutorizacao from "../../types/errors/UsuarioSemAutorizacao";
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

  buscarUsuarioByEmail(email: string): UsuarioRetornoDTO {
    const usuario = this.usuarioRepo.buscarUsuarioByEmail(email);
    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    return this.gerarUsuarioRetorno(usuario);
  }

  cadastrarPassageiro(dadosPassageiro: CadastrarUsuarioDTO): UsuarioRetornoDTO {
    const isCadastrado = this.usuarioRepo.buscarUsuarioByEmail(dadosPassageiro.email);
    if (isCadastrado) {
      throw new EmailJaCadastrado();
    }
    const usuario: UsuarioDTO = {
      email: dadosPassageiro.email,
      hashSenha: toHashSenha(dadosPassageiro.senha),
      nome: dadosPassageiro.nome,
      viacao: dadosPassageiro.viacao,
      role: Role.passageiro
    };
    const usuarioCriado = this.usuarioRepo.adicionarUsuario(usuario);

    return this.gerarUsuarioRetorno(usuarioCriado);
  }

  cadastrarFuncionario(dadosFuncionario: CadastrarUsuarioDTO, usuarioEmail: string): UsuarioRetornoDTO {
    const isCadastrado = this.usuarioRepo.buscarUsuarioByEmail(dadosFuncionario.email);
    if (isCadastrado) {
      throw new EmailJaCadastrado();
    }
    const usuarioJaCadastrado = this.usuarioRepo.buscarUsuarioByEmail(usuarioEmail);

    const funcionario: UsuarioDTO = {
      email: dadosFuncionario.email,
      hashSenha: toHashSenha(dadosFuncionario.senha),
      nome: dadosFuncionario.nome,
      viacao: usuarioJaCadastrado.viacao ? usuarioJaCadastrado.viacao : dadosFuncionario.viacao,
      role: Role.funcionarioViacao
    };
    const funcionarioCriado = this.usuarioRepo.adicionarUsuario(funcionario);

    return this.gerarUsuarioRetorno(funcionarioCriado);
  }

  cadastrarAdministrador(dadosAdmnistrador: CadastrarUsuarioDTO): UsuarioRetornoDTO {
    const isCadastrado = this.usuarioRepo.buscarUsuarioByEmail(dadosAdmnistrador.email);
    if (isCadastrado) {
      throw new EmailJaCadastrado();
    }
    
    const admnistrador: UsuarioDTO = {
      email: dadosAdmnistrador.email,
      hashSenha: toHashSenha(dadosAdmnistrador.senha),
      nome: dadosAdmnistrador.nome,
      role: Role.admnistrador
    };
    const admnistradorCriado = this.usuarioRepo.adicionarUsuario(admnistrador);

    return this.gerarUsuarioRetorno(admnistradorCriado);

  }

  compararSenha(senha: string, email: string) {
    const usuario = this.buscarUsuarioToLogin(email);
    if (!usuario) {
      return;
    }
    return toHashSenha(senha) === usuario.hashSenha;
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

  private buscarUsuarioToLogin(email: string): UsuarioBD {
    const usuario = this.usuarioRepo.buscarUsuarioByEmail(email);
    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    return usuario;
  }
}