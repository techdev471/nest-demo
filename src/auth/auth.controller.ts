import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

    @Post()
    async login(@Body() authDto: AuthDto, @Response() res) {
        const {email, password} = authDto;
        if (!email || !password) {
            return res.status(HttpStatus.BAD_REQUEST).json("Please enter all details");
        } else {
            const userDetail = await this.authService.login(authDto);
            const payload = { user: userDetail };
            const jwtToken = await this.jwtService.signAsync(payload);
            console.log(userDetail);
            return res.status(HttpStatus.OK).json({userDetail, token: jwtToken});
        }
    }
}
