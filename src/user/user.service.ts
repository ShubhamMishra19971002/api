import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ emailAddress: email }).exec();
    }

    async saveUser(userParam): Promise<User> {  
        const userdetails = {
            userName: `${userParam.firstName} ${userParam.lastName}`,
            emailAddress: userParam.email,
        };

        const user = new this.userModel(userdetails);
        return await user.save();  
    }

    
    async addPostToUser(email: string, post: { title: string; content: string }) {
        const user = await this.userModel.findOne({ emailAddress: email });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        const newPost = { _id: uuidv4(), ...post, createdAt: new Date() };
        user.posts.push(newPost);
        await user.save();
        return newPost;
    }
    
   
    async getUserPosts(email: string) {
        const user = await this.userModel.findOne({ emailAddress: email });
        if (!user) {
          throw new Error('User not found');
        }
        return user.posts;
    }
    
    async updateUserPost(email: string, postId: string, updatedPost: { title?: string; content?: string }) {
        const user = await this.userModel.findOne({ emailAddress: email });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        const postIndex = user.posts.findIndex((post) => post._id === postId);
        if (postIndex === -1) {
          throw new Error('Post not found');
        }
    
        user.posts[postIndex] = { ...user.posts[postIndex], ...updatedPost };
        await user.save();
        return user.posts[postIndex];
    }
    async deleteUserPost(email: string, postId: string) {
        const user = await this.userModel.findOne({ emailAddress: email });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        const filteredPosts = user.posts.filter((post) => post._id !== postId);
        if (filteredPosts.length === user.posts.length) {
          throw new Error('Post not found');
        }
    
        user.posts = filteredPosts;
        await user.save();
        return { message: 'Post deleted successfully' };
    }

    async getPostById(postId: string) {
      const user = await this.userModel.findOne({ 'posts._id': postId });
      if (!user) return null;
  
      return user.posts.find(post => post._id === postId);
  }
}
