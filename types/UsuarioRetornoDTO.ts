import { Role } from "./Roles";

export type UsuarioRetornoDTO = {
    role: Role,
    nome: string,
    email: string,
    viacao?: number
}