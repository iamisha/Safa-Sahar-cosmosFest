import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './inputs/auth.input';
import { JwtWithUser } from '../auth/entities/auth._entity';
import { UseGuards } from '@nestjs/common';
import { SignInGuard } from '../modules/guards/graphql-signin-guard';
import { OtpType } from '../otp/entities/otp.entity';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import { GraphqlPassportAuthGuard } from 'src/modules/guards/graphql-passport-auth.guard';
import { Request, Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async SignUp(@Args('input') input: SignUpInput): Promise<User> {
    return await this.authService.signUp(input);
  }

  @Mutation(() => JwtWithUser)
  @UseGuards(SignInGuard)
  async signIn(
    @Args('input') input: SignInInput,
    @Context() { res }: { res: Response },
  ): Promise<JwtWithUser> {
    const result = await this.authService.signIn(input);
    res.cookie('jwt', result.jwt, { httpOnly: true }); // Set the cookie
    return result;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    const result = await this.authService.forgotPassword(email);
    return result;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<boolean> {
    const result = await this.authService.resetPassword(token, newPassword);
    return result;
  }

  @Mutation(() => Boolean)
  async requestOtpVerify(
    @Args('email') email: string,
    @Args('otpType') otpType: OtpType,
  ): Promise<boolean> {
    return await this.authService.requestOtpVerify(email, otpType);
  }

  @Mutation(() => Boolean)
  async verifyEmail(
    @Args('email') email: string,
    @Args('otpCode') otpCode: string,
  ): Promise<boolean> {
    const result = await this.authService.verifyEmail(email, otpCode);
    return result;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  async logout(
    @CurrentUser() user: User,
    @Args('accessToken') accessToken: string,
  ): Promise<boolean> {
    const success = await this.authService.logout(user, accessToken);
    return success;
  }
}
