import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async authCallback(user): Promise<{ accessToken: string }> {  
        try {
            let existingUser = await this.userService.findUserByEmail(user.email);
            
            if (!existingUser) {
                existingUser = await this.userService.saveUser(user);
            }
    
            console.log("User found or saved:", existingUser);
    
            const accessToken = this.jwtService.sign(
                { userName: existingUser.userName, emailAddress: existingUser.emailAddress },
                { secret: 'qwertyuiop', expiresIn: '1h' }
            );
    
            return { accessToken }; 
        } catch (error) {
            console.error('Error in authCallback:', error);
            throw new Error('Token generation failed');
        }
    }
}    
