import { type ApplicationCommandOptionData, type ChatInputCommandInteraction, type Client } from "discord.js";

declare global {
    interface Command {
        name: string;
        description: string;
        options: ApplicationCommandOptionData[];

        callback: (params: { interaction: ChatInputCommandInteraction<"cached">; client: Client<true> }) => Awaitable<void>;
    }

    type Awaitable<T> = T | Promise<T>;
}
