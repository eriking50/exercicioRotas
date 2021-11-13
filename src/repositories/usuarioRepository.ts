import { ultimoIdByArray } from "helpers/UltimoId";
import { AtualizarUsuarioDTO } from "../../types/AtualizarUsuarioDTO";
import { UsuarioBD } from "../../types/BD/UsuarioBD";
import { Role } from "../../types/Roles";
import { UsuarioDTO } from "../../types/UsuarioDTO";

const usuarios: UsuarioBD[] = [
    { id: 1, hashSenha: 'coleta@raroacademy', role: Role.admnistrador, email: 'coleta@rarolabs.com.br', nome: 'Paulo Coleta' },
    { id: 2, hashSenha: 'phil@raroacademy', role: Role.funcionarioViacao, email: 'phil@rarolabs.com.br', nome: 'Phil', viacao: 1 },
    { id: 3, hashSenha: 'paulo@raroacademy', role: Role.passageiro, email: 'paulo@rarolabs.com.br', nome: 'Paulo' },
];

export default class UsuarioRepository {
    buscarUsuarioById(id: number) {
        return usuarios.find(usuario => usuario.id === id);
    }

    adicionarUsuario(dadosPassageiro: UsuarioDTO) {
        const id = ultimoIdByArray(usuarios);
        const usuario = {...dadosPassageiro, id}
        usuarios.push(usuario);
        return usuario;
    }
    
    alterarUsuario(id: number, dadosPassageiro: AtualizarUsuarioDTO) {
        const usuarioIndex = usuarios.findIndex(usuarioFIndex => usuarioFIndex.id === id);
        const usuario = usuarios.find(usuario => usuario.id === id);
        usuarios.splice(usuarioIndex, 1, {...usuario, ...dadosPassageiro});
    }

    deletarUsuario(id: number) {
        const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);
        usuarios.splice(usuarioIndex, 1);
    }
}