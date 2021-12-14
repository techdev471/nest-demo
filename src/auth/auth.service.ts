import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor (@InjectModel(User.name) private userModel: Model<UserDocument>){}

  async login(authDto: AuthDto) {

    const {email, password} = authDto;
    const isUserExist = await this.userModel.findOne({ email: email });
    const flag = false;
    if (!isUserExist) {
        const data = {
          flag: flag, message: "User not found",
        }
        return data;
    }
    if (!(await bcrypt.compare(password, isUserExist.password))) {
        const data = {
          flag: flag, message: "Incorrect Password!",
        }
        return data;
    } else {
        const data = {
          flag: true, message: "Successfully logged In.", isUserExist,
        }
        return data;
    }

  }
}
