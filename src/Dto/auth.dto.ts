import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";

export class userDto{


    @IsNotEmpty()
    @IsString()
    emailAddress:string

    @IsNotEmpty()
    @IsString()
    userName:string

    @Prop({ type: [{ title: String, content: String, createdAt: Date }] })
  posts: { title: string; content: string; createdAt: Date }[];
   

    
}