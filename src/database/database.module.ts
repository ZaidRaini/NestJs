import { Global, Module } from '@nestjs/common';
import { DatabaseServices } from './database.service';

@Global()
@Module({
  providers: [DatabaseServices],
  exports: [DatabaseServices],
})
export class DatabaseModule {}
