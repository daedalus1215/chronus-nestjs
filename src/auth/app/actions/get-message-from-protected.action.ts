import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("protected")
export class GetMessageFromProtectedAction {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get()
  apply() {
    return { message: "This is a protected resource!" };
  }
}
