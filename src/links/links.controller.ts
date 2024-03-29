import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Get(':short')
  findOne(@Param('short') short: string) {
    return this.linksService.findOneByShort(short);
  }

  @Post()
  create(@Body() data: CreateLinkDto) {
    return this.linksService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(id);
  }
}
