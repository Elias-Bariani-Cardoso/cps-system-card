import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('Documentação da API de registro e gerenciamento de usuários')
    .setVersion('1.0')
    .addBearerAuth() // Se usar autenticação JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantém o token JWT no Swagger
    },
  });

  await app.listen(port);

  // Logs úteis
  logger.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  logger.log(`📚 Swagger disponível em: http://localhost:${port}/api`);
}
bootstrap();