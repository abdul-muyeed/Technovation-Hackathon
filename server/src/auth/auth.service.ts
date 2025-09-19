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
import { and, eq, InferSelectModel } from 'drizzle-orm';
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
import { RegisterUserDto } from './dto/user.dto';
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
    let user: InferSelectModel<typeof schema.userSchema>;
    let userRole: Role;
    if (!credential.username || !credential.password) {
      throw new UnauthorizedException('Username and password are required');
    }
    const users = await this.db
      .select()
      .from(this.userTable)
      .where(
        and(
          eq(this.userTable.email, credential.username),
          eq(this.userTable.role, credential.role || Role.USER),
        ),
      )
      .limit(1);
    if (users.length === 0) {
      throw new UnauthorizedException('Invalid Credential');
    }
    user = users[0];
    return {
      id: user!.id,
      name: user!.email[0],
      role: user!.role as Role,
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

  async registerUser(body: RegisterUserDto) {
    const { email, password } = body;
    const existingUser = await this.db
      .select()
      .from(this.userTable)
      .where(eq(this.userTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await argon.hash(password);
    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await this.db
      .insert(this.userTable)
      .values(newUser)
      .returning();

    return {
      message: 'User registered successfully',
      userId: result[0].id,
    };
  }

  async getUsers() {
    return await this.db.query.userSchema.findMany();
  }
}
