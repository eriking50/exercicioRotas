import { Role } from "./Roles";

export default interface TokenPayload {
  role: Role,
  nome: string,
  email: string,
  viacao: number
}