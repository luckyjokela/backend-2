// src/interfaces/modules/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase } from '../../application/useCases/User/CreateUser.usecase';
import { GetUserUseCase } from '../../application/useCases/User/GetUser.usecase';
import { UpdateUserUseCase } from '../../application/useCases/User/UpdateUser.usecase';
import { DeleteUserUseCase } from '../../application/useCases/User/DeleteUser.usecase';
import { ChangeUserPasswordUseCase } from '../../application/useCases/auth/ChangePasswordUser.usecase';
import { JwtModule } from '@nestjs/jwt';
import { MakeUserMakerUseCase } from '../../application/useCases/User/MakeUserMaker.usecase';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    // ✅ Ничего не добавляй — глобальные модули уже доступны
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
    ChangeUserPasswordUseCase,
    MakeUserMakerUseCase,
    // ❌ УБЕРИ ЭТОТ БЛОК:
    // {
    //   provide: USER_REPOSITORY_TOKEN,
    //   useClass: UserRepository,
    // },
  ],
  // ✅ Экспортируй useCase если нужны другим модулям
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    MakeUserMakerUseCase,
  ],
})
export class UserModule {}
