import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptographyService } from '../../services/cryptography.service';
import { UserMessage } from './messages/user.message';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly cryptographyService: CryptographyService,
  ) {}

  public async create(createUserDto: UserDto) {
    await this.validateUser(createUserDto.email);

    const createdUser = new this.userModel(createUserDto);

    createdUser.password = await this.cryptographyService.hashPassword(
      createUserDto.password,
    );
    createdUser.status = true;

    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().select('-password').exec();
  }

  findOne(id: string): Promise<User> {
    try {
      const objectId = new Types.ObjectId(id);
      return this.userModel.findById(objectId).select('-password').exec();
    } catch (error) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, 404);
    }
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, 404);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const objectId = new Types.ObjectId(id);
      await this.userModel.findByIdAndUpdate({ _id: objectId }, updateUserDto);
      return await this.findOne(id);
    } catch (error) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, 404);
    }
  }

  async remove(id: string) {
    const { status } = await this.findOne(id);

    return await this.update(id, { status: !status });
  }

  private async validateUser(email: string) {
    if (await this.checkIfUserExists(email))
      throw new HttpException(UserMessage.USER_ALREADY_EXISTS, 400);
  }

  private async checkIfUserExists(email: string) {
    return !!(await this.findOneByEmail(email));
  }
}
