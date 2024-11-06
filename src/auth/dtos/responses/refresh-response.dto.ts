import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshResponseDto {
  @Expose()
  accessToken!: string;
}
