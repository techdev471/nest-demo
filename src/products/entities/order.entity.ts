import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.entity';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop({type : mongoose.Schema.Types.ObjectId , ref : 'User'})
    userId : mongoose.Schema.Types.ObjectId | User

    @Prop()
    total : number

    @Prop({type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]})
    items : mongoose.Schema.Types.ObjectId[] | Product[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);
