import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersRepositoryService} from "../../core/repositories/users-repository.service";
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";
import {DateTime} from "luxon";

@Injectable()
export class AuthService {

    constructor(
        private usersRepo: UsersRepositoryService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.usersRepo.findOne(loginDto.email);
        if (user?.password !== loginDto.password) {
            throw new UnauthorizedException('Email or password is incorrect!');
        }
        const payload = {id: user.id, email: user.email, companyId: user.companyId};
        const expiresIn = loginDto.rememberMe
            ? 60 * 60 * 24 * 30  // 30 days
            : 60 * 60 * 5;       // 5 hours
        return {
            access_token: await this.jwtService.signAsync(payload, {expiresIn: expiresIn}),
            expiresAt: DateTime.utc().toMillis() + expiresIn * 1000,
        };
    }
}
