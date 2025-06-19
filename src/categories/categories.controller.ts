import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryValidator } from './validators/category.validator';
import { CategoryCreate, CategoryUpdate } from '#shared/types/models/category.model-types';
import { z } from 'zod';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CREATED_RESPONSE, DELETE_ONE_RESPONSE, GET_MANY_RESPONSE, GET_ONE_RESPONSE } from './docs/response.docs';


@Controller('categories')
export class CategoriesController {
  private entityValidator = z.number().int().positive();

  validateId = this.entityValidator.parse;
  validateIds = z.array(this.entityValidator).parse;

  validator = new CategoryValidator();

  constructor(private readonly categoriesService: CategoriesService) { }

  private parseInput = <
    ValidatorName extends keyof Pick<typeof this.validator, 'create' | 'update' | 'delete'>,
    Schema extends typeof this.validator[ValidatorName],
    Input extends Parameters<Schema['parse']>[0]
  >(
    input: Input,
    validatorName: ValidatorName
  ) => {
    try {
      return this.validator[validatorName].parse(input);
    } catch (err) {
      const error = err as Error;

      throw new BadRequestException(error.message);
    }
  };

  private parseID = (id: string): number => {
    try {
      return this.validateId(id);
    } catch {
      throw new BadRequestException(`ID must be a number`);
    }
  };


  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
      }
    }
  })
  @ApiCreatedResponse(CREATED_RESPONSE)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const parsed = this.parseInput(createCategoryDto, 'create') as CategoryCreate;

    return this.categoriesService.create(parsed);
  }

  @ApiQuery({
    type: 'number',
    name: 'limit',
    required: false
  })
  @ApiQuery({
    type: 'number',
    name: 'offset',
    required: false
  })
  @ApiQuery({
    type: 'string',
    name: 'sort',
    required: false
  })
  @ApiQuery({
    type: 'string',
    name: 'filter',
    required: false
  })
  @ApiOkResponse(GET_MANY_RESPONSE)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'enum',
          enum: [200]
        }
      }
    }
  })
  @Patch('delete')
  async deleteMany(@Body() ids: number[]) {
    const parsed = this.validateIds(ids);

    try {
      await this.categoriesService.deleteMany(Array.from(new Set(parsed)));

      return { status: 200 };
    } catch (err) {
      const error = err as Error;

      throw new BadRequestException(error.message);
    }
  }

  @ApiParam({
    type: 'number',
    name: 'id'
  })
  @ApiOkResponse(GET_ONE_RESPONSE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = this.parseID(id);

    return this.categoriesService.findOne(parsedId);
  }

  @ApiParam({
    type: 'number',
    name: 'id'
  })
  @ApiOkResponse(GET_ONE_RESPONSE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const parsedId = this.parseID(id);
    const parsed = this.parseInput(updateCategoryDto, 'update') as CategoryUpdate;

    return this.categoriesService.update(parsedId, parsed);
  }

  @ApiParam({
    type: 'number',
    name: 'id'
  })
  @ApiOkResponse(DELETE_ONE_RESPONSE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const parsedId = this.parseID(id);

    return this.categoriesService.remove(parsedId);
  }
}
