import { IBase } from '@common/interfaces/base.interface';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshTokenPayloadDto implements Pick<IBase, 'id'> {
  @Expose()
  readonly id!: string;
}
