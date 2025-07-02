import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: Repository<UserEntity>,
    private readonly mapper: UserMapper
  ) {}

  async save(user: User): Promise<User> {
    // Converter para dados de persistência
    const persistenceData = this.mapper.toPersistence(user);
    
    // Criar entidade a partir dos dados
    const entity = this.ormRepository.create(persistenceData);
    
    // Salvar no banco de dados
    const savedEntity = await this.ormRepository.save(entity);
    
    // Converter de volta para domínio e retornar
    return this.mapper.toDomain(savedEntity);
  }
}