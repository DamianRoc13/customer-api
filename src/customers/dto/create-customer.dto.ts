import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}