import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStuffUnstuffDto {
  @IsString()
  @IsNotEmpty()
  readonly jobModeCode: string;

  @IsString()
  @IsNotEmpty()
  readonly commodityCode: string;

  @IsString()
  @IsNotEmpty()
  readonly modifiedBy: string;
}
