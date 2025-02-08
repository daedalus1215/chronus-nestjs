import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserAggregator } from "src/users/domain/aggregators/user.aggregator";

@Injectable()
export class AuthService {
  constructor(
    private readonly userAggregator: UserAggregator,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userAggregator.findByEmail(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
