import { Injectable, Req } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { ForbiddenException } from "@nestjs/common/exceptions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        // Generate Hashed Password
        const hash = await argon.hash(dto.password);

        // Save User to DB
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            });

            // Strip hash from user
            delete user.hash;

            // Return User
            return user;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already in use');
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {

        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        // If the user does not exist, throw error
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }

        // Compare the password with the hash
        const valid = await argon.verify(user.hash, dto.password);

        // If the password is incorrect, throw error
        if (!valid) {
            throw new ForbiddenException('Invalid credentials');
        }

        // Send back the user
        delete user.hash;
        return user;
    }

}