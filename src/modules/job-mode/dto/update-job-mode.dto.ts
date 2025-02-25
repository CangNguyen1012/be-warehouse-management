import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateJobModeDto {
  @IsString()
  @IsNotEmpty()
  jobModeCode: string;

  @IsString()
  @IsNotEmpty()
  jobModeName: string;

  @IsBoolean()
  @IsOptional()
  isLoLo?: boolean;

  @IsBoolean()
  @IsOptional()
  isCfsStuff?: boolean;

  @IsBoolean()
  @IsOptional()
  isCfsUnstuff?: boolean;

  @IsBoolean()
  @IsOptional()
  isCfsChange?: boolean;

  @IsBoolean()
  @IsOptional()
  isServiceYard?: boolean;

  @IsBoolean()
  @IsOptional()
  isServiceNoncont?: boolean;

  @IsOptional()
  extraMode?: number;

  @IsString()
  @IsNotEmpty()
  modifiedBy: string;
}
