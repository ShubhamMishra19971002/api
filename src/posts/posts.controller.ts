import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PostDto } from 'src/Dto/post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
 // Ensure you have an AuthGuard for protecting routes

@Controller('posts')
@UseGuards(AuthGuard) 
export class PostsController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserPosts(@Req() req) {
    const user = await this.userService.findUserByEmail(req.user.emailAddress);
    return user ? user.posts : [];
  }

  @Post()
  async createPost(@Req() req, @Body() postDto: PostDto) {
    return await this.userService.addPostToUser(req.user.emailAddress, postDto); 
  }

  @Put(':id')
  async updatePost(@Req() req, @Param('id') postId: string, @Body() postDto: PostDto) {
    return await this.userService.updateUserPost(req.user.emailAddress, postId, postDto); 
  }

  @Delete(':id')
  async deletePost(@Req() req, @Param('id') postId: string) {
    return await this.userService.deleteUserPost(req.user.emailAddress, postId); 
  }
}
