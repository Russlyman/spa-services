import { plainToInstance } from 'class-transformer';
import { IsInt, IsOptional, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsOptional()
  @IsInt()
  PORT: number;

  @IsOptional()
  @IsString()
  HOST: string;

  @IsString()
  SQL_CONNECTION_STRING: string;

  @IsString()
  MONGODB_CONNECTION_STRING: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
