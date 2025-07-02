import { User } from '../entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;
  // Adicione outros métodos conforme necessário
  // findByCpf(cpf: string): Promise<User | null>;
  // etc...
}