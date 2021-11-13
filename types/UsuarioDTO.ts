import { Role } from "./Roles";

export type UsuarioDTO = {
    id?: number,
    role: Role,
    nome: string,
    email: string,
    hashSenha: string,
    viacao?: number
}