import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpUserRequestDto } from '@users/dtos/requests/sign-up-user-request.dto';
import { SignUpUserResponseDto } from '@users/dtos/responses/sign-up-user-response.dto';
import { UsersService } from '@users/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('v1/signup')
  async signUpUser(
    @Body() signUpUserRequest: SignUpUserRequestDto,
  ): Promise<SignUpUserResponseDto> {
    return await this.usersService.signUpUser(signUpUserRequest);
  }
}
