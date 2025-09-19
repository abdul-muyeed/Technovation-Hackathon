import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_TOKEN } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { Database } from 'src/drizzle/schema.type';
import { CreateUserAddressDto } from './dto/address.dto';
import { UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  userTable = schema.users;
  userAddressTable = schema.userAddresses;
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly db: Database,
  ) {}

  async findAll() {
    return this.db.select().from(this.userTable);
  }

  async findOne(id: string) {
    const user = await this.db
      .select()
      .from(this.userTable)
      .leftJoin(
        this.userAddressTable,
        eq(this.userAddressTable.userId, this.userTable.id),
      )
      .where(eq(this.userTable.id, id));

    if (!user) {
      return new BadRequestException('User not found');
    }
    return user;
  }

  async updateUserInfo(id: string, updateUserDto: UpdateUserDto) {
    await this.db
      .update(this.userTable)
      .set({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        phone: updateUserDto.phone,
      })
      .where(eq(this.userTable.id, id));

    return {
      message: 'Update Successfully',
    };
  }

  async createUserAddress(userId: string, body: CreateUserAddressDto) {
    await this.db
      .insert(this.userAddressTable)
      .values({
        userId: userId,
        type: body.type,
        street: body.street,
        area: body.area,
        city: body.city,
        district: body.district,
        division: body.division,
        postalCode: body.postalCode,
        latitude: body.latitude?.toFixed(2),
        longitude: body.longitude?.toFixed(2),
        isDefault: body.isDefault,
        isActive: body.isActive,
      })
      .returning();
  }

  async updateUserAddress(
    userId: string,
    addressId: string,
    body: CreateUserAddressDto,
  ) {
    await this.db
      .update(this.userAddressTable)
      .set({
        type: body.type,
        street: body.street,
        area: body.area,
        city: body.city,
        district: body.district,
        division: body.division,
        postalCode: body.postalCode,
        latitude: body.latitude?.toFixed(2),
        longitude: body.longitude?.toFixed(2),
        isDefault: body.isDefault,
        isActive: body.isActive,
      })
      .where(
        and(
          eq(this.userAddressTable.id, addressId),
          eq(this.userAddressTable.userId, userId),
        ),
      )
      .returning();
  }
}
