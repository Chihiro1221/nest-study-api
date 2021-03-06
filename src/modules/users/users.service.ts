import {HttpException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserModel.findOne({username: createUserDto.username})
    if (user) {
      throw new HttpException('用户名已存在，请更换用户名', 403)
    }
    return this.UserModel.create(createUserDto);
  }

  async findAll() {
    return this.UserModel.find()
  }

  async findOne(id: string) {
    return this.UserModel.findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto)
  }

  async remove(id: string) {
    return this.UserModel.findByIdAndDelete(id)
  }
}
