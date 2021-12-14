import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Order.name , schema : OrderSchema}]),
    MulterModule.register({
      dest: './files'
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
