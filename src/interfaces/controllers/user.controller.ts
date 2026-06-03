import { Result } from '../../core/shared/types/Result.type';
import { JwtAuthGuard } from '../../auth/guards/JwtAuthGuard';
import { IReq } from '../IReq/IRequest';
import { CreateUserDto } from '../../application/dtos/user/CreateUser.dto';
import { UpdateUserDto } from '../../application/dtos/user/UpdateUser.dto';
import { ChangePasswordDto } from '../../application/dtos/auth/ChangePassword.dto';
import { CreateUserUseCase } from '../../application/useCases/User/CreateUser.usecase';
import { UpdateUserUseCase } from '../../application/useCases/User/UpdateUser.usecase';
import { GetUserUseCase } from '../../application/useCases/User/GetUser.usecase';
import { DeleteUserUseCase } from '../../application/useCases/User/DeleteUser.usecase';
import { ChangeUserPasswordUseCase } from '../../application/useCases/auth/ChangePasswordUser.usecase';
import { MakeUserMakerUseCase } from '../../application/useCases/User/MakeUserMaker.usecase'; // ← ДОБАВИТЬ!
import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private readonly CreateUseCase: CreateUserUseCase,
    private readonly GetUserUseCase: GetUserUseCase,
    private readonly UpdateUseCase: UpdateUserUseCase,
    private readonly DeleteUserUseCase: DeleteUserUseCase,
    private readonly changeUserPasswordUseCase: ChangeUserPasswordUseCase,
    private readonly makeUserMakerUseCase: MakeUserMakerUseCase, // ← ДОБАВИТЬ!
  ) {}

  @Post()
  async makeUser(
    @Body() dto: CreateUserDto,
  ): Promise<Result<{ id: string; email: string; username: string }>> {
    const result = await this.CreateUseCase.execute(
      '',
      dto.email,
      dto.password,
      dto.username,
      dto.name,
      dto.surname,
      dto.middleName || '',
    );

    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return {
      success: true,
      data: {
        id: result.data.getIdValue(),
        email: result.data.getEmail(),
        username: result.data.getUsername(),
      },
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: IReq) {
    const result = await this.GetUserUseCase.execute(req.user.userId);

    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    }

    return {
      id: result.data.getIdValue(),
      email: result.data.getEmail(),
      username: result.data.getUsername(),
      name: result.data.getName(),
      surname: result.data.getSurname(),
      middleName: result.data.getMiddleName(),
      role: result.data.getRole(),
    };
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() dto: UpdateUserDto): Promise<
    Result<{
      id: string;
      email: string;
      username: string;
      name: string;
      surname: string;
      middleName: string;
    }>
  > {
    const result = await this.UpdateUseCase.execute(
      '',
      dto.email,
      dto.username,
      dto.name,
      dto.surname,
      dto.middleName || '',
    );

    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return {
      success: true,
      data: {
        id: result.data.getIdValue(),
        email: result.data.getEmail(),
        username: result.data.getUsername(),
        name: result.data.getName(),
        surname: result.data.getSurname(),
        middleName: result.data.getMiddleName(),
      },
    };
  }

  @Patch('/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() dto: ChangePasswordDto, @Request() req: IReq) {
    const result = await this.changeUserPasswordUseCase.execute(
      req.user.userId,
      dto.oldPassword,
      dto.newPassword,
    );

    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return { success: true };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string, @Request() req: IReq) {
    if (req.user.userId !== id) {
      throw new HttpException(
        'You can only delete your own account',
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.DeleteUserUseCase.execute(id);
    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return { success: true, data: undefined };
  }

  @Patch('become-maker')
  @UseGuards(JwtAuthGuard)
  async becomeMaker(@Request() req: IReq) {
    const userId = req.user.userId; // ← ИСПРАВИТЬ (userId, не id)
    await this.makeUserMakerUseCase.execute(userId); // ← ИСПРАВИТЬ (использовать makeUserMakerUseCase)
    return { success: true, message: 'Теперь вы кондитер' };
  }
}
