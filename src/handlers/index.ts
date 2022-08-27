import { type Client } from "discord.js";
import { resolve } from "path";
import getFiles from "../utils/getFiles";

export default async (client: Client<true>) => {
    const commandFiles = getFiles<Command>(resolve(__dirname, "../commands"));

    client.application.commands.set(commandFiles).then(commands => {
        console.log("Registered commands: " + commands.map(e => e.name).join(", "));
    });

    client.on("interactionCreate", interaction => {
        if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

        const command = commandFiles.find(e => e.name === interaction.commandName);
        if (!command) return;

        command.callback({ client, interaction });
    });
};
