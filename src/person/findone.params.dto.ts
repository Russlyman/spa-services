import { IsInt, Min } from 'class-validator';

export class FindOneParams {
  @IsInt()
  @Min(0)
  personId: number;
}
