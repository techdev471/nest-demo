import { Body, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createProductDto: CreateProductDto , filename:string) {
    // return 'This action adds a new product';
    const { productname, code, description, price, categoryId } = createProductDto;
    const product = await this.productModel.create({
      productname: productname,
      code: code,
      description: description,
      price: price,
      categoryId: categoryId,
      file: filename
    });
    console.log("product", product);
    return product;
  }

  findAll() {
    // return `This action returns all products`;
    const product = this.productModel.find({});
    return product;
  }

  findOne(id: String) {
    // return `This action returns a #${id} product`;
    const product = this.productModel.findOne({ id: id });
    return product;
  }

  async update(id: String, updateProductDto: UpdateProductDto) {
    // return `This action updates a #${id} product`;
    // const product = await this.productModel.findByIdAndUpdate(
    //   id,
    //   { ...updateProductDto},
    //   { new: true },
    // );
    // return product;
  }

  remove(id: String) {
    // return `This action removes a #${id} product`;
    const product = this.productModel.findByIdAndDelete(id);
    return product;
  }

  async addCart(id: String, userId: String) {
    // return `This action updates a #${id} product`;
    const cart = await this.userModel.findOneAndUpdate(
      { id: userId },
      { $push: { cart: id } },
      { new: true },
    );
    return cart;
  }

  async removeCart(id: String, userId: String) {
    const cart = await this.userModel.findOneAndUpdate(
      { id: userId },
      { $pull: { cart: id } },
      { new: true },
    );
    return cart;
  }

  async checkOut(id: String) {

    console.log(id);
    
    const userCart = await this.userModel
      .findOne({ id: id }).populate({path : 'cart', select : { price : 1}}).select({cart : 1});
    
    if (userCart.cart.length == 0) {
      return "Cart is empty";
    } else {
      let total:number = 0 ;
      userCart.cart.forEach(element => {
        total = total + element.price;
      });

      const order = await this.orderModel.create({ userId :id , total: total, items: userCart.cart });
      await this.userModel.findOneAndUpdate({id:id},{$set:{cart : []}})
      return order;
    }
  }


}
