import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserAddressDto } from './dto/address.dto';
import { UpdateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('details')
  findOne(@Req() req) {
    const userId= req.user.id;
    return this.userService.findOne(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfo(id, updateUserDto);
  }

  @Post('address/')
  createAddress(
    @Req() req,
    @Body() createUserAddressDto: CreateUserAddressDto,
  ) {
    const userId = req.user.id;
    return this.userService.createUserAddress(userId, createUserAddressDto);
  }

  @Patch('address/:id')
  updateAddress(
    @Req() req,
    @Param('id', ParseUUIDPipe) addressId: string,
    @Body() updateUserAddressDto: CreateUserAddressDto,
  ) {
    const userId = req.user.id;

    return this.userService.updateUserAddress(
      userId,
      addressId,
      updateUserAddressDto,
    );
  }
}
