import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUtillsModule } from './auth-utills/auth-utills.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { User, UserSchema } from './Schemas/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PostsController } from './posts/posts.controller';
import { PostDetailsController } from './post-details/post-details.controller';

@Module({
  imports: [AuthUtillsModule,MongooseModule.forRoot('mongodb+srv://shubham:qwerty12345@cluster0.yyerrbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), UserModule,MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),JwtModule.register({
    secret:"amdsmsmsms",
    secretOrPrivateKey:"qwertyuiop",
    signOptions:{
        expiresIn:"1 hr"
    }
}),],
  controllers: [AppController, AuthController, PostsController, PostDetailsController],
  providers: [AppService, AuthService,UserService,JwtService],
})
export class AppModule {}
