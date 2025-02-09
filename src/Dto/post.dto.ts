import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  _id?: string; 
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  createdAt?: Date;
}
