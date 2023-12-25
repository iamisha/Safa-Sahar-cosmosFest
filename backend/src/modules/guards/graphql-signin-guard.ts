import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SignInGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isAuthSuccessful = await super.canActivate(context);
      if (!isAuthSuccessful) {
        return false;
      }
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      request.body = ctx.getArgs().input;
      // console.log('user is', request.user);
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.body = ctx.getArgs().input;
    return request;
  }
}
