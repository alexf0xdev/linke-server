import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from '../prisma/prisma.service';
import { nanoid } from 'nanoid';
import { QrCodeService } from '../qr-code/qr-code.service';

@Injectable()
export class LinksService {
  constructor(
    private prismaService: PrismaService,
    private qrCodeService: QrCodeService,
  ) {}

  getLinks() {
    return this.prismaService.link.findMany();
  }

  getLink(id: string) {
    return this.prismaService.link.findUnique({ where: { id } });
  }

  getLinkByShort(short: string) {
    return this.prismaService.link.findUnique({
      where: { short },
      select: { short: true, longUrl: true },
    });
  }

  async generateQrCodeById(id: string) {
    const link = await this.getLink(id);

    if (!link) throw new NotFoundException();

    const qrCodeBase64 = await this.qrCodeService.generateQrCode(
      `${process.env.CLIENT_URL}/${link.short}`,
    );

    const buffer = Buffer.from(
      qrCodeBase64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    return new StreamableFile(buffer);
  }

  createLink(data: CreateLinkDto) {
    const short = nanoid(6);

    return this.prismaService.link.create({
      data: { short, ...data },
    });
  }

  updateLink(id: string, data: UpdateLinkDto) {
    return this.prismaService.link.update({ where: { id }, data });
  }

  removeLink(id: string) {
    return this.prismaService.link.delete({ where: { id } });
  }
}
