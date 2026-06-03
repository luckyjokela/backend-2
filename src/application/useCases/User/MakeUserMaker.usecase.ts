import { Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../../../core/repositories/IUserRepository.interface';
import { Inject } from '@nestjs/common';
import { UserRoles } from '../../../core/entities/variableObjects/Role.enum';
import { User } from '../../../core/entities/User';

@Injectable()
export class MakeUserMakerUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Меняем роль на MAKER
    const updatedUser = new User(
      user.getId(),
      user.getEmailObj(),
      user.getPassword(),
      user.getUsernameObj(),
      user.getNameObj(),
      user.getMiddleNameObj(),
      user.getSurnameObj(),
      UserRoles.MAKER, // ← Меняем роль!
      user.getIsEmailConfirmed(),
      undefined,
      undefined,
      user.getSkills(),
      user.getIsOnline(),
    );

    await this.userRepository.save(updatedUser);
    return updatedUser;
  }
}
