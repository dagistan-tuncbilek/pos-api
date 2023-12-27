import {Injectable} from '@nestjs/common';
import {BaseRepositoryService} from "./base-repository.service";
import {CreateUserDto} from "../../models/users/dto/create-user.dto";
import {UpdateUserDto} from "../../models/users/dto/update-user.dto";
import {User} from "@prisma/client";

@Injectable()
export class UsersRepositoryService extends BaseRepositoryService {

    async findOne(email: string) {
        return this.prisma.user.findFirst({where: {email: email}})
    }

    async create(createUserDto: CreateUserDto) {
        return this.prisma.user
            .create({data: createUserDto})
            .then(user => this.removePassword(user))
            .catch(error => this.handleRepositoryError({
                error,
                className: UsersRepositoryService.name,
                method: 'create',
                props: {createUserDto}
            }));
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.user
            .update({where: {id}, data: updateUserDto})
            .then(user => this.removePassword(user))
            .catch(error => this.handleRepositoryError({
                error,
                className: UsersRepositoryService.name,
                method: 'update',
                props: {id, updateUserDto}
            }));
    }

    async delete(id: number) {
        return this.prisma.user
            .delete({where: {id}})
            .then(user => this.removePassword(user))
            .catch(error => this.handleRepositoryError({
                error,
                className: UsersRepositoryService.name,
                method: 'update',
                props: {id}
            }));
    }

    private removePassword(user: User) {
        delete user.password;
        return user;
    }
}
