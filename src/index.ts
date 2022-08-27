import { ShardingManager } from "discord.js";
import "dotenv/config";
import { resolve } from "path";

const manager = new ShardingManager(resolve(__dirname, "bot.js"), { token: process.env.TOKEN });

manager.spawn();
