import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        console.log({
            user: user,
        })
        return user;
    }
}
