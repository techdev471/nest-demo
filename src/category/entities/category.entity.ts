import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
    @Prop()
    categoryName: string;

    @Prop()
    isActive: boolean;
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);