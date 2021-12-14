import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    productname : String

    @Prop()
    code : String

    @Prop()
    description : String

    @Prop()
    price : number

    @Prop()
    file : String

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    categoryId : mongoose.Schema.Types.ObjectId | Category

}

export const ProductSchema = SchemaFactory.createForClass(Product);
