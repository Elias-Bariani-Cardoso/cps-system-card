import { User } from '../entities/user.entity';
import { Cpf } from '../value-objects/cpf.vo';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findByCpf(cpf: Cpf): Promise<User | null>;
  deleteByCpf(cpf: Cpf): Promise<void>;
}
