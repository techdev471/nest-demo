import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel: Model<UserDocument>){}

  async create(createUserDto: CreateUserDto) {

    const {name, email, password} = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.userModel.create({...createUserDto, password: hashPassword});

    return user;
  }

  findAll() {
    const user = this.userModel.find({}).populate({path:'cart'});
    return user;
  }

  findOne(id: string) {

    const user = this.userModel.findOne({id: id}).populate('cart');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, {...updateUserDto}, {new: true});
    // const user = this.userModel.findOneAndUpdate({id: id});
    return user;
  }

  remove(id: string) {
    const user = this.userModel.findByIdAndDelete(id);
    // const user = this.userModel.deleteOne({id: id});
    return user;
  }
}
