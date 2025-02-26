import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStuffUnstuffDto {
  @IsString()
  @IsNotEmpty()
  readonly jobModeCode: string;

  @IsString()
  @IsNotEmpty()
  readonly commodityCode: string;

  @IsString()
  @IsNotEmpty()
  readonly createdBy: string;
}
