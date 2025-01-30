import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class WeatherService {
  private readonly apiKey = `5B6LUHRJDF4TW9FJHNTZ978FV`;
  private readonly apiEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;
  constructor(
    private readonly httpService: HttpService,
    private readonly redisServer: RedisService,
  ) {}

  async getWeather(location: string) {
    const cacheKey = `weather:${location}`;
    const cacheData = await this.redisServer.get(cacheKey);

    if (cacheData) {
      console.log(cacheData);
      return JSON.parse(cacheData);
    }
    console.log('took data from api');
    const url = `${this.apiEndpoint}/${location}?key=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    const currentWeather =
      response.data.days?.[0]?.hours?.[new Date().getHours()] || null;
    await this.redisServer.set(cacheKey, JSON.stringify(currentWeather));

    return currentWeather;
  }
}
