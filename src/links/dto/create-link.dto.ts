import { IsInt, IsString, IsUrl, Length, Min, MinLength } from 'class-validator';

export class CreateLinkDto {
    @IsString()
    @MinLength(1)
    @IsUrl()
    url: string;
}
