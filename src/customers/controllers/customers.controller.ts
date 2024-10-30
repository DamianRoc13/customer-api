import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { JSendUtil } from '../../common/jsend/jsend.util';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto) {
        try {
            const customer = await this.customersService.create(createCustomerDto);
            return customer; // El interceptor JSend lo envolverá automáticamente
        } catch (error) {
            return JSendUtil.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll() {
        try {
            const customers = await this.customersService.findAll();
            return customers; // El interceptor JSend lo envolverá automáticamente
        } catch (error) {
            return JSendUtil.error(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        try {
            const customer = await this.customersService.findOne(id);
            return customer; // El interceptor JSend lo envolverá automáticamente
        } catch (error) {
            return JSendUtil.error(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        try {
            const customer = await this.customersService.update(id, updateCustomerDto);
            return customer; // El interceptor JSend lo envolverá automáticamente
        } catch (error) {
            return JSendUtil.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        try {
            await this.customersService.remove(id);
            return { message: 'Customer deleted successfully' }; // El interceptor JSend lo envolverá automáticamente
        } catch (error) {
            return JSendUtil.error(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
