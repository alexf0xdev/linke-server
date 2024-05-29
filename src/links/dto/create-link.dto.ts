import { IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsUrl({ require_protocol: true })
  longUrl: string;
}
