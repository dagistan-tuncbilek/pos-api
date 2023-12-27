import { Injectable } from '@nestjs/common';
import {UsersRepositoryService} from "../../core/repositories/users-repository.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(private usersRepo: UsersRepositoryService) {}

    create(createUserDto: CreateUserDto) {
        return this.usersRepo.create(createUserDto);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.usersRepo.update(id, updateUserDto);
    }

    delete(id: number) {
        return this.usersRepo.delete(id);
    }
}
