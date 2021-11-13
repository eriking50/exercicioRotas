import { Role } from "./Roles";

export type AtualizarUsuarioDTO = {
    role?: Role,
    nome?: string,
    hashSenha?: string,
    viacao?: number
}