import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Post {
  @Prop({ required: true }) 
  _id: string; 
  @Prop({ required: true }) 
  title: string;

  @Prop({ required: true }) 
  content: string;

  @Prop({ default: Date.now }) 
  createdAt: Date;
}

@Schema()
export class User extends Document {
  @Prop({ unique: true, required: true })
  emailAddress: string;

  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ type: [{ _id: String, title: String, content: String, createdAt: Date }], default: [] })
  posts: Post[]; // ✅ Store posts inside the User collection
}

export const UserSchema = SchemaFactory.createForClass(User);
