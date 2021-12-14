import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Express } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
 
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createProductDto: CreateProductDto , @UploadedFile('file') file ) {
    // console.log("file :", file.filename);
    return this.productsService.create(createProductDto, file.filename);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Put('addtocart/:id')
  addToCart(@Param('id') id: string, @Body() userId: String) {
    return this.productsService.addCart(id, userId);
  }

  @Put('removefromcart/:id')
  removeFromCart(@Param('id') id: string, @Body() userId: String) {
    return this.productsService.removeCart(id, userId);
  }

  @Put('checkout')
  checkOut(@Body('userId') userId: string){
    return this.productsService.checkOut(userId);
  }
}
