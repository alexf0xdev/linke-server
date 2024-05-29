import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRedirect(@Res() res: Response) {
    return res.redirect(process.env.CLIENT_URL);
  }
}
