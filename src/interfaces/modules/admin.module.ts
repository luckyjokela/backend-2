import { Module } from '@nestjs/common';
import { GetAllUserUseCase } from '../../application/useCases/User/GetAllUser.usecase';
import { DeleteUserUseCase } from '../../application/useCases/User/DeleteUser.usecase';
import { AdminController } from '../controllers/admin.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminController],
  providers: [GetAllUserUseCase, DeleteUserUseCase],
})
export class AdminModule {}
