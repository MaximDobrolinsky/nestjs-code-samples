import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { BaseService } from 'src/@core/base/base.service';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async getByUsername(username: string): Promise<UserDocument> {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async createWithHashedPassword(dto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(
      dto.password,
      await bcrypt.genSalt(),
    );
    const userCreateDto: CreateUserDto = {
      ...dto,
      password: hashedPassword,
    };

    return this.userModel.create(userCreateDto);
  }

  async updatePassword(
    id: Types.ObjectId,
    oldPassword: string,
    newPassword: string,
  ): Promise<UserDocument> {
    const user = await this.getById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Incorrect password');
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      await bcrypt.genSalt(),
    );

    return this.userModel
      .findByIdAndUpdate(id, { password: hashedPassword })
      .exec();
  }
}
