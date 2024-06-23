import { IsNotEmpty, IsNumber } from 'class-validator';

export class VoteDto {
  @IsNumber()
  @IsNotEmpty()
  average: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}
