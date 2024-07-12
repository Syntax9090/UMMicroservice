// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  username: string;

  @Prop()
  birthdate: Date;

  // additional fields as needed
  @Prop()
  email: string;

  // ...
}

export const UserSchema = SchemaFactory.createForClass(User);