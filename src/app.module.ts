import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [RedisModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
