import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpRequestDto } from '@users/dtos/requests/sign-up-request.dto';
import { SignUpResponseDto } from '@users/dtos/responses/sign-up-response.dto';
import { UsersService } from '@users/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('v1/signup')
  async signUp(@Body() signUpRequest: SignUpRequestDto): Promise<SignUpResponseDto> {
    return await this.usersService.signUpUser(signUpRequest);
  }
}
