import { IsInt, Min, IsOptional, IsAlpha, IsUppercase } from 'class-validator';

export class FindOneQuery {
  @IsOptional()
  @IsInt()
  @Min(0)
  page: number = 0;

  @IsOptional()
  @IsUppercase()
  @IsAlpha('en-GB', {
    message: (args) => {
      return `${args.property} must contain only letters (A-Z)`;
    },
  })
  search?: string;
}
