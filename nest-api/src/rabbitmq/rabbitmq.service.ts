import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Note } from "src/notes/notes.entity";
import { Channel, connect, ConnectionUrl } from "amqp-connection-manager";

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    private connection: ConnectionUrl;
    private channel: Channel;
    private queue: string;

    constructor(private config: ConfigService) { }



    async onModuleInit() {
        const url = this.config.get<string>('RABBITMQ_URL');
        this.queue = this.config.get<string>('RABBITMQ_QUEUE') || 'default_queue_name'

        this.connection = connect(url);
        this.channel = await this.connection.createChannel({
            setup: async (channel) => {
                await channel.assertQueue(this.queue, {durable:true})
            }
        });

        console.log(`RABBITMQ CONNECTED SUCCESFULLY - queue: ${this.queue}`);
    }

    async onModuleDestroy() {
        await this.channel?.close();
        await this.connection?.close();

    }

    async publishNote(note: Note) {
        if (!this.channel) throw new Error('RabbitMQ channel not initialized');

        const message = Buffer.from(JSON.stringify({
            noteId: note.id,
            content: note.content,
        }));

        await this.channel.sendToQueue(this.queue, message, { persistent: true });
        console.log('NOTE PUBLISHED TO QUEUE:', this.queue);
    }


}