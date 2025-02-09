import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),JwtModule.register({
        secret:"amdsmsmsms",
        signOptions:{
            expiresIn:"1 hr"
        }
    })],
    providers:[GoogleStrategy,AuthService,UserService,JwtService]
})
export class AuthUtillsModule {}
