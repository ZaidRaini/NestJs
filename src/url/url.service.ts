import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async redirectUrl(shortUrlPath: string) {
    const urlEntry = await this.prisma.uRL.findUnique({
      where: { shortUrlPath },
    });
    return urlEntry ? urlEntry.longUrl : null;
  }

  async createShortUrl(longUrl: string) {
    const shortUrlPath = Math.random().toString(36).substring(2, 8);
    const existing = await this.prisma.uRL.findUnique({ where: { longUrl } });
    if (existing) {
      return existing.shortUrlPath;
    }
    await this.prisma.uRL.create({ data: { longUrl, shortUrlPath } });
    return shortUrlPath;
  }
}
