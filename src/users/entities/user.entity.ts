import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: String

    @Prop()
    email: String

    @Prop()
    password: String

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}] })
    cart: Product[]
}

export const UserSchema = SchemaFactory.createForClass(User);