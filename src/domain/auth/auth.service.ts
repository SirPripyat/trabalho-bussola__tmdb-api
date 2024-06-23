import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CryptographyService } from '../../services/cryptography.service';
import { LoginDto } from './dto/login.dto';
import { UserMessage } from '../user/messages/user.message';
import { AuthMessage } from './messages/auth.message';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cryptographyService: CryptographyService,
  ) {}

  public async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException(UserMessage.USER_NOT_FOUND);

    const isPasswordMatch = await this.cryptographyService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatch)
      throw new UnauthorizedException(AuthMessage.INVALID_PASSWORD);

    const payload = { sub: user.fullname, userMail: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
