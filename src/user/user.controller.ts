import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Get('me')
    getMe(
        @GetUser() user: User,
    ) {
        console.log({
            user
        })
        return user;
    }

    @Patch()
    editMe(@GetUser('id') userID: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userID, dto);
    }
}
