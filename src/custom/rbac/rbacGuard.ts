import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enum/role.enum';
import { ROLES_KEY } from './role.decorator';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    this.logger.debug(`User: ${JSON.stringify(user)}`);
    this.logger.debug(`Required roles: ${JSON.stringify(requiredRoles)}`);
    if (!user) {
      this.logger.warn('No user found in request');
      return false;
    }

    const dbUser = await this.authService.findUserById(user.id);
    if (!dbUser) {
      this.logger.warn(`User with id ${user.id} not found in database`);
      return false;
    }

    const hasRole = requiredRoles.some((role) => dbUser.Roles.includes(role));
    this.logger.debug(`User roles: ${JSON.stringify(dbUser.Roles)}`);
    this.logger.debug(`Has required role: ${hasRole}`);

    return hasRole;
  }
}
