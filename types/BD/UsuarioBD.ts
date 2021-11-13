import { Role } from "../Roles"

export type UsuarioBD = {
    id: number,
    hashSenha: string,
    role: Role,
    email: string,
    nome: string,
    viacao?: number
}