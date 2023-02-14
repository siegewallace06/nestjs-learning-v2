import { Injectable, Req } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { ForbiddenException } from "@nestjs/common/exceptions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

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

        // Send back the Token
        return this.signToken(user.id, user.email);
    }

    async signToken(userID: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            id: userID,
            email
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });

        return {
            access_token: token,
        }
    }

}