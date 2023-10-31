import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersRepositoryService} from "../../core/repositories/users-repository.service";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {

    constructor(private usersRepo: UsersRepositoryService) {}

    async login(loginDto: LoginDto) {
        const user = await this.usersRepo.findOne(loginDto.email);
        if (user?.password !== loginDto.password) {
            throw new UnauthorizedException();
        }
        const {password, ...result} = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
}
