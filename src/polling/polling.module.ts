import { Module } from '@nestjs/common';
import { PollGateway } from './poll/poll.gateway';

@Module({
  providers: [PollGateway]
})
export class PollingModule {}
