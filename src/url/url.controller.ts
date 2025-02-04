import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Request, Response } from 'express';

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shortener')
  async urlShortener(@Body('url') url: string) {
    const shortUrlPath = await this.urlService.createShortUrl(url);
    return {
      message: 'Short URL created',
      shortUrl: `http://localhost:3000/${shortUrlPath}`,
    };
  }

  @Get('*')
  async urlRedirect(@Req() req: Request, @Res() res: Response) {
    const shorturlPath = req.path.substring(1);
    const longUrl = await this.urlService.redirectUrl(shorturlPath);

    if (!longUrl) {
      return res.status(400).json({ message: 'URL not found' });
    } else {
      return res.redirect(longUrl);
    }
  }
}
