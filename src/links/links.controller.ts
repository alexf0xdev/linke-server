import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { NotFoundInterceptor } from '../inteceptors/not-found.interceptor';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Get(':short')
  @UseInterceptors(NotFoundInterceptor)
  getLinkByShort(@Param('short') short: string) {
    return this.linksService.getLinkByShort(short);
  }

  @Get(':id/qr-code')
  @Header('Content-Type', 'image/png')
  generateQrCodeById(@Param('id') id: string) {
    return this.linksService.generateQrCodeById(id);
  }

  @Post()
  createLink(@Body() data: CreateLinkDto) {
    return this.linksService.createLink(data);
  }

  @Delete(':id')
  removeLink(@Param('id') id: string) {
    return this.linksService.removeLink(id);
  }
}
