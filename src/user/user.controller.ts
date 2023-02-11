import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@Controller('users')
export class UserController {

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(
        @GetUser() user: User,
        // @GetUser('email') email: string,
    ) {
        console.log({
            user,
        })
        return user;
    }
}
