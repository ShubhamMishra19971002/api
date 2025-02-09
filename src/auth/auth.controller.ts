import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService :AuthService){}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(){

    }
    @Get('callback/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any, @Res() res: any) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            const { accessToken } = await this.authService.authCallback(req.user);
            console.log("Generated Token:", accessToken);
    
            if (!res.headersSent) {
                return res.redirect(`http://localhost:4200/authroute?token=${accessToken}`);
            }
        } catch (error) {
            console.error('Error during Google Auth redirect:', error);
    
            if (!res.headersSent) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
    
}