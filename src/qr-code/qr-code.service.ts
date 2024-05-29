import { Injectable, InternalServerErrorException } from '@nestjs/common';
import qrcode from 'qrcode';

@Injectable()
export class QrCodeService {
  generateQrCode(data: string) {
    try {
      return qrcode.toDataURL(data);
    } catch {
      throw new InternalServerErrorException('Failed to generate QR code');
    }
  }
}
