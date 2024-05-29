import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './links/links.module';
import { PrismaModule } from './prisma/prisma.module';
import { QrCodeModule } from './qr-code/qr-code.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LinksModule,
    PrismaModule,
    QrCodeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
