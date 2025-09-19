// src/user/dto/user-address.dto.ts
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { AddressType } from 'src/core/enum'; // Assuming you have AddressType enum

// Create DTO
export class CreateUserAddressDto {
  

  @IsOptional()
  @IsString()
  type?: AddressType = AddressType.HOME;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  division: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

// Update DTO
export class UpdateUserAddressDto {
  @IsOptional()
  @IsString()
  type?: AddressType;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  division?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// Response DTO
// export class UserAddressResponseDto {
//   id: string;
//   userId: string;
//   type: AddressType;
//   street: string;
//   area: string;
//   city: string;
//   district: string;
//   division: string;
//   postalCode?: string;
//   latitude?: number;
//   longitude?: number;
//   isDefault: boolean;
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }
