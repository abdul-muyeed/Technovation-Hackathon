import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
import {
  AuthUser,
  LoginCredentials,
  RefreshTokenPayload,
} from 'src/core/dtos/auth_user.dto';
import { Role } from 'src/core/enum';
import { DRIZZLE_TOKEN } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { Database } from 'src/drizzle/schema.type';
import refresh_jwtConfig from './config/refresh.config';
@Injectable()
export class AuthService {
  userTable = schema.userSchema;
  constructor(
    private jwtService: JwtService,
    @Inject(refresh_jwtConfig.KEY)
    private refreshJwtConfig: ConfigType<typeof refresh_jwtConfig>,
    @Inject(DRIZZLE_TOKEN)
    private db: Database,
  ) {}
  // // validate user crendential
  async validateUser(credential: LoginCredentials): Promise<AuthUser> {
    let user: any;
    let userRole: Role;
    if (!credential.username || !credential.password) {
      throw new UnauthorizedException('Username and password are required');
    }
    switch (credential.role) {
      case Role.ADMIN:
        userRole = Role.ADMIN;
        user = await this.db.query.userSchema.findFirst({
          where: eq(this.userTable.email, credential.username),
        });
        if (!user) {
          throw new UnauthorizedException('Invalid credential');
        }
        break;
      case Role.USER:
        userRole = Role.USER;
      // user = await db(this.doctorTable)
      //   .select('*')
      //   .where({
      //     username: credential.username,
      //     password: credential.password,
      //   })
    }

    return {
      id: 'user_id_example',
      name: 'user_name_example',
      role: Role.USER,
    };
  }
  // // generate jwt tokens
  async generateTokens(payload: any, sessionId: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(
        { ...payload, session_id: sessionId },
        this.refreshJwtConfig,
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
  // //login
  async login(payload: AuthUser) {
    const sessionId = randomBytes(12).toString('hex');
    return await this.generateTokens(payload, sessionId);
  }

  // logout
  async logout() {
    return {
      msg: 'Logout successful',
      statusCode: HttpStatus.OK,
    };
  }
  async createSession({ id, session }: { id: string; session: string }) {
    // const newSession = this.sessionRepository.create({
    //   id,
    //   session,
    // });
    // await this.sessionRepository.save(newSession);
    return {
      id: '',
      session: '',
    };
  }
  async deleteSession(sessionId: string) {
    // const session = await this.sessionRepository.findOne({
    //   where: {
    //     id: sessionId,
    //   },
    // });
    // if (session) {
    //   await this.sessionRepository.delete(session.id);
    // }
  }
  async findSession(id: string) {
    // return await this.sessionRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
  }
  // // regenerate refresh token

  async refreshToken(payload: RefreshTokenPayload) {
    const sessionId = randomBytes(12).toString('hex');
    const { access_token, refresh_token } = await this.generateTokens(
      payload,
      sessionId,
    );
    const hashedRefreshedToken = await argon.hash(refresh_token);
    await this.deleteSession(payload.session_id);

    await this.createSession({
      id: sessionId,
      session: hashedRefreshedToken,
    });
    // Save the refresh token in the database
    return {
      access_token,
      refresh_token,
    };
  }

  async validateRefreshToken(payload: RefreshTokenPayload, token: string) {
    // const session = await this.findSession(payload.session_id);
    // if (!session) {
    //   throw new UnauthorizedException('Invalid Credential');
    // }
    // const isValid = await argon.verify(session.session, token);
    // if (!isValid) {
    //   throw new UnauthorizedException('Invalid Credential');
    // }
    return payload;
  }
}
