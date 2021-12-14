import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class CategoryService {
  constructor (@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){}

  create(createCategoryDto: CreateCategoryDto) {
    // return 'This action adds a new category';
    const { categoryName, isActive } = createCategoryDto;
    const category = this.categoryModel.create({ ...createCategoryDto });

    return category;
  }

  findAll() {
    // return `This action returns all category`;
    const category = this.categoryModel.find({});
    return category;
  }

  findOne(id: string) {
    // return `This action returns a #${id} category`;
    const category = this.categoryModel.findOne({ id: id });
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // return `This action updates a #${id} category`;
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { ...updateCategoryDto },
      { new: true },
    );
    return category;
  }

  remove(id: string) {
    // return `This action removes a #${id} category`;
    const category = this.categoryModel.findByIdAndDelete(id);
    return category;
  }
}
