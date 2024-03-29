import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from '../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class LinksService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.link.findMany();
  }

  findOne(id: string) {
    return this.prismaService.link.findUnique({ where: { id } });
  }

  async findOneByShort(short: string) {
    const link = await this.prismaService.link.findUnique({
      where: { short },
      select: { short: true, longUrl: true },
    });

    if (!link) throw new NotFoundException();

    return link;
  }

  create(data: CreateLinkDto) {
    const short = nanoid(6);

    return this.prismaService.link.create({ data: { short, ...data } });
  }

  update(id: string, data: UpdateLinkDto) {
    return this.prismaService.link.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prismaService.link.delete({ where: { id } });
  }
}
