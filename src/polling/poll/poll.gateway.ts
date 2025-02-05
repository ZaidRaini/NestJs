import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Poll {
  question: string;
  options: { [key: string]: number };
  isClose: boolean;
}

@WebSocketGateway(4000, { cors: { origin: '*' } })
export class PollGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activePoll: Poll | null = null;

  private votes: { [key: string]: number } = {};

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    if (this.activePoll) {
      this.server.emit('activePoll', this.activePoll);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createPoll')
  handleCreatePoll(
    @MessageBody() pollData: { question: string; options: string[] },
    @ConnectedSocket() client: Socket,
  ): void {
    if (typeof pollData === 'string') {
      try {
        pollData = JSON.parse(pollData); // Try parsing if it's a string
      } catch (e) {
        console.log(e);
        client.emit('error', 'Received data is not valid JSON.');
        return;
      }
    }

    if (!pollData) {
      client.emit('error', 'Poll data is missing.');
      return;
    }
    if (!pollData.question) {
      client.emit('error', 'Poll question is invalid.');
      return;
    }
    if (!Array.isArray(pollData.options)) {
      client.emit('error', 'Poll options are invalid or missing.');
      return;
    }

    // Ensure there is no active poll already
    if (this.activePoll) {
      // console.log(client);
      client.emit('error', 'A poll is already active.');
      return;
    }

    // Create a new poll with options initialized to 0 votes
    const options = pollData.options.reduce(
      (acc, option) => {
        acc[option] = 0;
        return acc;
      },
      {} as { [key: string]: number },
    );
    this.activePoll = {
      question: pollData.question,
      options,
      isClose: false,
    };

    // Emit the new poll to all connected clients
    this.server.emit('activePoll', this.activePoll);
  }

  @SubscribeMessage('vote')
  handleVote(
    @MessageBody() option: string,
    @ConnectedSocket() client: Socket,
  ): void {
    // Check if there is an active poll
    if (!this.activePoll) {
      client.emit('error', 'No active poll to vote on.');
      return;
    }

    console.log('Received vote option:', option);
    console.log('Available poll options:', this.activePoll.options);

    const trimmedOption = option.trim();

    if (typeof trimmedOption !== 'string') {
      client.emit('error', 'Invalid vote option format.');
      return;
    }

    // If the selected option exists, increment the vote count
    if (this.activePoll.options.hasOwnProperty(trimmedOption)) {
      console.log('click');
      this.activePoll.options[trimmedOption] += 1;

      // Emit the updated poll results to all connected clients
      this.server.emit('updateResults', this.activePoll);
    } else {
      client.emit('error', 'Invalid vote option.');
    }
  }

  @SubscribeMessage('closePoll')
  handleCLose(@ConnectedSocket() client: Socket): void {
    if (!this.activePoll) {
      client.emit('error', 'No active poll to close');
    }

    this.activePoll.isClose = true;
    this.server.emit('pollClosed', {
      message: 'The poll is now closed.',
      poll: this.activePoll,
    });
  }
}
