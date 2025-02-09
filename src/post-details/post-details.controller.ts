import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('post-details')
export class PostDetailsController {
    constructor(private userService:UserService){}
    @Get(':id')
    async getPostById(@Param('id') postId: string) {
      const post = await this.userService.getPostById(postId);
      if (!post) {
        return { message: 'Post not found', statusCode: 404 };
      }
      return post;
    }
  
}
