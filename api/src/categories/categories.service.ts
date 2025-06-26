import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Filter, FindManyOptions, FindOptionsOrder, FindOptionsWhere, Repository, Sort, SortDirection } from 'typeorm';
import { Category } from './entities/category.entity';
import { RequestHelpers } from '#shared/utilities/request.helpers';
import { ListSorting } from '#shared/types/request/list.request-types';

@Injectable()
export class CategoriesService {
  constructor(
    private repo: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category();

    Object.assign(newCategory, createCategoryDto);

    return await this.repo.save(newCategory);
  }

  private convertFiltersToWhere(filters: Filter<Category>[]): FindManyOptions<Category>['where'] {
    let where = {} as NonNullable<FindManyOptions<Category>['where']>;

    for (const filter of filters) {
      const affectedColumns = Object.keys(filter);

      for (const column of affectedColumns) {
        if (!where[column] && !!filter[column]) {
          where[column] = [];
        }

        where[column].push(filter[column]);
      }
    }

    return where;
  }

  private convertSortingToOrder(sort: ListSorting): FindOptionsOrder<Category> {
    const order: FindOptionsOrder<Category> = {};
    const ascending = [
      'ascending',
      1
    ] as any[];
    const descending = [
      'descending',
      -1
    ] as any[];

    for (const key in sort) {
      const name = key as keyof Category;
      let dir = sort[key];

      if (dir !== null && dir !== undefined) {
        if (ascending.includes(dir)) {
          dir = 'asc';
        }

        if (descending.includes(dir)) {
          dir = 'desc';
        }

        if (['asc', 'desc'].includes(`${dir}`)) {
          order[name] = dir as 'asc' | 'desc';
        }
      }
    }

    return order;
  }

  async findAll(params: ReturnType<typeof RequestHelpers.getListRequestParams<Category>>) {
    const where = params.filtering ? this.convertFiltersToWhere(params.filtering) : undefined;
    const order = params.sorting ? this.convertSortingToOrder(params.sorting) : undefined;

    const count = await this.repo.count({
      where
    });
    const found = await this.repo.find({
      where,
      take: params.paging.limit,
      skip: params.paging.offset,
      order,
    });

    const totalPages = Math.ceil(count / params.paging.limit);

    return {
      paging: {
        ...params.paging,
        totals: {
          records: count,
          pages: totalPages
        }
      },
      sorting: params.sorting ?? null,
      filtering: params.filtering ?? null,
      records: found
    };
  }

  findOne(id: number, withTimesheetLines: boolean = false) {
    return this.repo.findOne({
      where: {
        id
      },
      relations: withTimesheetLines ? {
        lines: true
      } : undefined
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Category with id '${id}' not found`);
    }

    Object.assign(found, updateCategoryDto);

    return await this.repo.save(found);
  }

  async remove(id: number) {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Category with id '${id}' not found`);
    }

    return await this.repo.remove(found);
  }

  deleteMany(ids: number[]) {
    return this.repo.delete(ids);
  }
}
