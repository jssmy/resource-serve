import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Dominios permitidos para usar la API
  const allowedOrigins = [
    'https://hardacodeando.com',
    'http://hardacodeando.com',
    'https://bugzilo.com',
    'http://bugzilo.com',
  ];

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: (origin, callback) => {
        // Permitir requests sin origin (Postman, curl, etc.) solo en desarrollo
        // En producción, descomentar la siguiente línea para rechazar requests sin origin
        // if (!origin) return callback(new Error('Not allowed by CORS'), false);

        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'), false);
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Resource Serve API')
    .setDescription('API de autenticación y gestión de recursos')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Gestión de usuarios')
    .addTag('roles', 'Gestión de roles')
    .addTag('permissions', 'Gestión de permisos')
    .addTag('reset-password', 'Reset de contraseña')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000`);
  console.log(`📚 Swagger documentation: http://localhost:3000/api/docs`);
}
bootstrap();
