import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories/user.repository'; // A interface/abstração
import { User } from '../../../domain/entities/user.entity'; // A entidade de domínio
import { UserEntity } from '../entities/user.entity'; // A entidade de persistência (TypeORM)
import { UserMapper } from '../mappers/user.mapper';
import { Cpf } from '../../../domain/value-objects/cpf.vo'

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: Repository<UserEntity>,
    private readonly mapper: UserMapper,
  ) {}

  async save(user: User): Promise<User> {
    const persistenceData = this.mapper.toPersistence(user);
    const entity = this.ormRepository.create(persistenceData);
    const savedEntity = await this.ormRepository.save(entity);
    return this.mapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<User | undefined> {
    const entity = await this.ormRepository.findOne({ where: { id } });
    return entity ? this.mapper.toDomain(entity) : undefined;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.ormRepository.find();
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findByCpf(cpf: Cpf): Promise<User | null> {
  const entity = await this.ormRepository.findOne({ where: { cpf: cpf.getValue() } }); // Use .getValue() here!
  return entity ? this.mapper.toDomain(entity) : null;
  }

  async delete(id: string): Promise<void> {
    // Você pode escolher entre remover por ID ou por CPF, dependendo da sua interface.
    // O erro indicou `deleteByCpf`, então vamos incluir os dois para exemplo.
    await this.ormRepository.delete(id);
  }

  async deleteByCpf(cpf: Cpf): Promise<void> {
  await this.ormRepository.delete({ cpf: cpf.getValue() }); // Use .getValue() here!
  }

  // Adicione o método update se sua interface UserRepository o possuir
  async update(user: User): Promise<User> {
    const persistenceData = this.mapper.toPersistence(user);
    // Para atualizar, geralmente você cria uma entidade com o ID e os dados a serem atualizados
    // ou busca a entidade existente, atualiza e salva.
    const updatedEntity = await this.ormRepository.save(persistenceData); // save() no TypeORM também faz updates se o ID existe
    return this.mapper.toDomain(updatedEntity);
  }
}