import { IsDate, IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateLinkDto {
    @IsString()
    @MinLength(1)
    url: string;

    @IsString()
    @MinLength(8)
    shortUrl: string;
    
    @IsInt()
    @Min(0)
    visited: number;
    
    @IsString()
    @MinLength(10)
    createdAt: string;
}
