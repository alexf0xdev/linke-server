import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { QrCodeModule } from '../qr-code/qr-code.module';

@Module({
  imports: [PrismaModule, QrCodeModule],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
