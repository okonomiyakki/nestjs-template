import { Exclude } from 'class-transformer';
import { UserProfileResponseDto } from '@users/dtos/responses/user-profile.response.dto';

@Exclude()
export class SignUpResponseDto extends UserProfileResponseDto {}
