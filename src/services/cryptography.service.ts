import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptographyService {
  constructor() {}

  public async hashPassword(password: string): Promise<string> {
    const salt = await this.generateSaltOrRounds();
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private async generateSaltOrRounds() {
    return await bcrypt.genSalt(10);
  }
}
