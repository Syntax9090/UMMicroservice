// ignore.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.entity';

@Schema()
export class Ignore extends Document {
  @Prop({ type: Schema.Types.ObjectId, ref: 'User' })
  subject: User;

  @Prop({ type: Schema.Types.ObjectId, ref: 'User' })
  target: User;
}

export const IgnoreSchema = SchemaFactory.createForClass(Ignore);