import { Client, IntentsBitField, Partials } from "discord.js";
import handlers from "./handlers";

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers],
    partials: [Partials.GuildMember],
});

client.on("ready", readyClient => {
    console.log(readyClient.user.tag + " is ready");

    handlers(readyClient);
});

client.on("shardReady", shard => console.log(`Shard ${shard} ready`));

client.login(process.env.TOKEN);
