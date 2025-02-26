import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobModeDto {
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
  createdBy: string;
}
